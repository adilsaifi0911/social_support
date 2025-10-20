export type OpenAiError = {
	error: {
		message: string;
		type: string;
		param: string | null;
		code: string | null;
	};
};

export type OpenAiResponseData = {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: OpenAiResponseChoice[];
	usage?: OpenAiResponseUsage; // usage may be missing for some responses
};

type OpenAiResponseChoice = {
	index: number;
	message: {
		role: 'system' | 'user' | 'assistant';
		content: string;
	};
	finish_reason: string;
};

type OpenAiResponseUsage = {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
};

export type OpenAiResponse = {
	data: OpenAiResponseData;
	status: number;
	statusText: string;
	headers?: Record<string, string>;
};

export type GenericServerResponse<T> = {
	status: boolean; // whether the request was processed successfully
	statusCode: number; // HTTP status code
	message: string; // descriptive message
	errors?: Record<string, string[]> | null; // optional validation errors
	data: T; // payload of type T
	errorCode?: number; // optional app-specific error code
};
