import * as yup from 'yup';
import i18n from 'i18next';

const situationDescriptionSchema = yup.object({
	currentFinancialSituation: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('situationDescription.fields.currentFinancialSituation'),
			})
		)
		.min(20, ({ min }) =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('situationDescription.fields.currentFinancialSituation'),
				min,
			})
		),
	employmentCircumstances: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('situationDescription.fields.employmentCircumstances'),
			})
		)
		.min(20, ({ min }) =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('situationDescription.fields.employmentCircumstances'),
				min,
			})
		),
	reasonForApplying: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('situationDescription.fields.reasonForApplying'),
			})
		)
		.min(20, ({ min }) =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('situationDescription.fields.reasonForApplying'),
				min,
			})
		),
});

export default situationDescriptionSchema;
