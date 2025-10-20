import axios, { AxiosError } from 'axios';
import type {
	GenericServerResponse,
	OpenAiError,
	OpenAiResponse,
} from '../types/response';
import type { SituationDescriptionDataType } from '../types/applicationFormDataType';

const getAIResponse = async (
	category: keyof SituationDescriptionDataType,
	userInput: string
): Promise<GenericServerResponse<string>> => {
	const response: GenericServerResponse<string> = {
		status: false,
		statusCode: 500,
		message: '',
		data: '',
	};

	// Simulate Successful Response for Testing
	// response.status = true;
	// response.data = userInput;
	// return response;

	// System message varies by category
	const systemPrompt: Record<keyof SituationDescriptionDataType, string> = {
		currentFinancialSituation:
			'You help users describe their current financial hardship for aid or support forms. Respond with one respectful, empathetic sentence between 30–200 characters.',
		employmentCircumstances:
			'You help users describe their employment circumstances or challenges for aid forms. Respond with one clear, concise, and respectful sentence between 30–200 characters.',
		reasonForApplying:
			'You help users describe their reason for applying for social support. Respond with one respectful and concise sentence between 30–200 characters.',
	};

	try {
		const res = await axios.post<OpenAiResponse['data']>(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content: systemPrompt[category],
					},
					{
						role: 'user',
						content: userInput,
					},
				],
				temperature: 0.7,
				max_tokens: 100,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
				},
			}
		);

		const message = res.data.choices?.[0]?.message?.content?.trim() ?? '';

		response.status = true;
		response.statusCode = res.status;
		response.message = 'AI response generated successfully.';
		response.data = message;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<OpenAiError>;

			if (axiosError.response) {
				const { status, data } = axiosError.response;
				response.statusCode = status;
				response.message =
					data?.error?.message || `AI service error (HTTP ${status}).`;
			} else if (axiosError.request) {
				response.statusCode = 503;
				response.message = 'No response received from AI service.';
			} else {
				response.statusCode = 500;
				response.message = `Axios Error: ${axiosError.message}`;
			}
		} else {
			response.statusCode = 500;
			response.message = `Unexpected Error: ${String(error)}`;
		}
	}

	return response;
};

const aiService = {
	getAIResponse,
};

export default aiService;
