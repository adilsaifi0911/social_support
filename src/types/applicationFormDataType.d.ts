import type { InferType } from 'yup';
import type personalInfoSchema from '../schema/personalInfoSchema';
import type familyFinancialSchema from '../schema/familyFinancialSchema';
import type situationDescriptionSchema from '../schema/situationDescriptionSchema';

// Form data types
export type PersonalInfoDataType = InferType<typeof personalInfoSchema>;
export type FamilyFinancialDataType = InferType<typeof familyFinancialSchema>;
export type SituationDescriptionDataType = InferType<
	typeof situationDescriptionSchema
>;
export type ApplicationFormDataType = {
	personalInfo: PersonalInfoDataType;
	familyFinancialInfo: FamilyFinancialDataType;
	situationDescription: SituationDescriptionDataType;
};
