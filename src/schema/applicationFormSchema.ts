import * as yup from 'yup';
import personalInfoSchema from '../schema/personalInfoSchema';
import familyFinancialSchema from '../schema/familyFinancialSchema';
import situationDescriptionSchema from '../schema/situationDescriptionSchema';

// Validation schemas
export const applicationFormSchema = yup.object({
	personalInfo: personalInfoSchema,
	familyFinancial: familyFinancialSchema,
	situationDescription: situationDescriptionSchema,
});
