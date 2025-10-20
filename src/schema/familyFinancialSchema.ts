import * as yup from 'yup';
import i18n from 'i18next';

const familyFinancialSchema = yup.object({
	maritalStatus: yup.string().required(() =>
		i18n.t('validation.errors.required', {
			field: i18n.t('familyFinancialInfo.fields.maritalStatus'),
		})
	),
	dependents: yup
		.number()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('familyFinancialInfo.fields.dependents'),
			})
		)
		.min(0, () =>
			i18n.t('validation.errors.minValue', {
				field: i18n.t('familyFinancialInfo.fields.dependents'),
				min: 0,
			})
		)
		.integer(() =>
			i18n.t('validation.errors.integer', {
				field: i18n.t('familyFinancialInfo.fields.dependents'),
			})
		),
	employmentStatus: yup.string().required(() =>
		i18n.t('validation.errors.required', {
			field: i18n.t('familyFinancialInfo.fields.employmentStatus'),
		})
	),
	monthlyIncome: yup
		.number()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('familyFinancialInfo.fields.monthlyIncome'),
			})
		)
		.min(0, () =>
			i18n.t('validation.errors.minValue', {
				field: i18n.t('familyFinancialInfo.fields.monthlyIncome'),
				min: 0,
			})
		),
	housingStatus: yup.string().required(() =>
		i18n.t('validation.errors.required', {
			field: i18n.t('familyFinancialInfo.fields.housingStatus'),
		})
	),
});

export default familyFinancialSchema;
