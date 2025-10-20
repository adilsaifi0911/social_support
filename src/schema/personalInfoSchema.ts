import * as yup from 'yup';
import i18n from 'i18next';

const personalInfoSchema = yup.object({
	name: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.name'),
			})
		)
		.min(2, () =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('personalInfo.fields.name'),
				min: 2,
			})
		),
	nationalId: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.nationalId'),
			})
		)
		.matches(/^[0-9]+$/, () =>
			i18n.t('validation.errors.invalidFormat', {
				field: i18n.t('personalInfo.fields.nationalId'),
				format: 'only digits',
			})
		),
	dateOfBirth: yup.string().required(() =>
		i18n.t('validation.errors.required', {
			field: i18n.t('personalInfo.fields.dateOfBirth'),
		})
	),
	gender: yup.string().required(() =>
		i18n.t('validation.errors.required', {
			field: i18n.t('personalInfo.fields.gender'),
		})
	),
	address: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.address'),
			})
		)
		.min(10, () =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('personalInfo.fields.address'),
				min: 10,
			})
		),
	city: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.city'),
			})
		)
		.min(2, () =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('personalInfo.fields.city'),
				min: 2,
			})
		),
	state: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.state'),
			})
		)
		.min(2, () =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('personalInfo.fields.state'),
				min: 2,
			})
		),
	country: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.country'),
			})
		)
		.min(2, () =>
			i18n.t('validation.errors.minChars', {
				field: i18n.t('personalInfo.fields.country'),
				min: 2,
			})
		),
	phone: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.phone'),
			})
		)
		.matches(/^[0-9]{10}$/, () => i18n.t('validation.errors.invalidPhone')),
	email: yup
		.string()
		.required(() =>
			i18n.t('validation.errors.required', {
				field: i18n.t('personalInfo.fields.email'),
			})
		)
		.email(() => i18n.t('validation.errors.invalidEmail')),
});

export default personalInfoSchema;
