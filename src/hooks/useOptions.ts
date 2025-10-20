import { useTranslation } from 'react-i18next';

const useOptions = (
	option:
		| 'maritalStatusOptions'
		| 'employmentStatusOptions'
		| 'housingStatusOptions'
		| 'genderOptions'
) => {
	const { t } = useTranslation();

	switch (option) {
		case 'genderOptions':
			return [
				{
					value: 'male',
					label: t('personalInfo.fields.genderOptions.male'),
				},
				{
					value: 'female',
					label: t('personalInfo.fields.genderOptions.female'),
				},
				{
					value: 'other',
					label: t('personalInfo.fields.genderOptions.other'),
				},
			];
		case 'maritalStatusOptions':
			return [
				{
					value: 'single',
					label: t('familyFinancialInfo.fields.maritalStatusOptions.single'),
				},
				{
					value: 'married',
					label: t('familyFinancialInfo.fields.maritalStatusOptions.married'),
				},
				{
					value: 'divorced',
					label: t('familyFinancialInfo.fields.maritalStatusOptions.divorced'),
				},
				{
					value: 'widowed',
					label: t('familyFinancialInfo.fields.maritalStatusOptions.widowed'),
				},
				{
					value: 'separated',
					label: t('familyFinancialInfo.fields.maritalStatusOptions.separated'),
				},
			];
		case 'employmentStatusOptions':
			return [
				{
					value: 'employed_full_time',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.employed_full_time'
					),
				},
				{
					value: 'employed_part_time',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.employed_part_time'
					),
				},
				{
					value: 'self_employed',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.self_employed'
					),
				},
				{
					value: 'unemployed',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.unemployed'
					),
				},
				{
					value: 'student',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.student'
					),
				},
				{
					value: 'retired',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.retired'
					),
				},
				{
					value: 'homemaker',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.homemaker'
					),
				},
				{
					value: 'freelancer',
					label: t(
						'familyFinancialInfo.fields.employmentStatusOptions.freelancer'
					),
				},
				{
					value: 'other',
					label: t('familyFinancialInfo.fields.employmentStatusOptions.other'),
				},
			];

		case 'housingStatusOptions':
			return [
				{
					value: 'own',
					label: t('familyFinancialInfo.fields.housingStatusOptions.own'),
				},
				{
					value: 'rent',
					label: t('familyFinancialInfo.fields.housingStatusOptions.rent'),
				},
				{
					value: 'living_with_family',
					label: t(
						'familyFinancialInfo.fields.housingStatusOptions.living_with_family'
					),
				},
				{
					value: 'subsidized',
					label: t(
						'familyFinancialInfo.fields.housingStatusOptions.subsidized'
					),
				},
				{
					value: 'homeless',
					label: t('familyFinancialInfo.fields.housingStatusOptions.homeless'),
				},
				{
					value: 'temporary',
					label: t('familyFinancialInfo.fields.housingStatusOptions.temporary'),
				},
				{
					value: 'other',
					label: t('familyFinancialInfo.fields.housingStatusOptions.other'),
				},
			];
		default:
			return [];
	}
};

export default useOptions;
