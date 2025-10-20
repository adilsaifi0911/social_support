import type {
	ApplicationFormDataType,
	FamilyFinancialDataType,
	PersonalInfoDataType,
	SituationDescriptionDataType,
} from '../types/applicationFormDataType';

export const personalInfoDefault: PersonalInfoDataType = {
	name: '',
	dateOfBirth: '',
	nationalId: '',
	gender: '',
	address: '',
	city: '',
	state: '',
	country: '',
	phone: '',
	email: '',
};

export const familyFinancialDefault: FamilyFinancialDataType = {
	employmentStatus: '',
	monthlyIncome: 0,
	dependents: 0,
	housingStatus: '',
	maritalStatus: '',
};

export const situationDescriptionDefault: SituationDescriptionDataType = {
	currentFinancialSituation: '',
	employmentCircumstances: '',
	reasonForApplying: '',
};

export const applicationDataDefaults: ApplicationFormDataType = {
	personalInfo: personalInfoDefault,
	familyFinancialInfo: familyFinancialDefault,
	situationDescription: situationDescriptionDefault,
};
