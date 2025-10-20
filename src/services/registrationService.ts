import type { ApplicationFormDataType } from '../types/applicationFormDataType';
import type { GenericServerResponse } from '../types/response';

const postRegistrationData = async (
	data: ApplicationFormDataType
): Promise<GenericServerResponse<string>> => {
	const response: GenericServerResponse<string> = {
		status: false,
		statusCode: 500,
		message: '',
		data: '',
	};

	await new Promise<void>((resolve) => {
		console.log('Posting registration data to backend:', data);

		setTimeout(() => {
			// const shouldFail = Math.random() < 1; // 10% chance to fail
			const shouldFail = false;
			if (shouldFail) {
				response.message = 'Registration failed. Please try again later.';
				resolve();
			} else {
				response.status = true;
				response.statusCode = 200;
				response.message = 'Registration successful.';
				response.data = 'Registration successful.';
				resolve();
			}
		}, 1000); // simulate 1 second delay
	});

	return response;
};
const registrationService = {
	postRegistrationData,
};
export default registrationService;
