import {
	Box,
	TextField,
	Typography,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApplication } from '../hooks/useApplication';
import { Controller } from 'react-hook-form';
import useOptions from '../hooks/useOptions';

// Step 1 - Personal Information Fields
const PersonalInfo = () => {
	const { t } = useTranslation();
	const { personalInfoForm } = useApplication();
	const genderOptions = useOptions('genderOptions');

	const {
		register,
		formState: { errors },
	} = personalInfoForm;

	return (
		<Box>
			<Typography variant='h6' sx={{ mb: 2 }}>
				{t('personalInfo.title')}
			</Typography>

			<TextField
				{...register('name')}
				label={t('personalInfo.fields.name')}
				fullWidth
				margin='normal'
				error={!!errors.name}
				helperText={errors.name?.message}
			/>

			<TextField
				{...register('nationalId')}
				label={t('personalInfo.fields.nationalId')}
				fullWidth
				margin='normal'
				error={!!errors.nationalId}
				helperText={errors.nationalId?.message}
			/>

			<TextField
				{...register('dateOfBirth')}
				label={t('personalInfo.fields.dateOfBirth')}
				type='date'
				fullWidth
				margin='normal'
				InputLabelProps={{ shrink: true }}
				error={!!errors.dateOfBirth}
				helperText={errors.dateOfBirth?.message}
			/>
			<FormControl fullWidth margin='normal' error={!!errors.gender}>
				<InputLabel>{t('personalInfo.fields.gender')}</InputLabel>
				<Controller
					name='gender'
					control={personalInfoForm.control}
					render={({ field }) => (
						<Select {...field} label={t('personalInfo.fields.gender')}>
							{genderOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.gender && (
					<Typography color='error' variant='caption'>
						{errors.gender.message as string}
					</Typography>
				)}
			</FormControl>
			<TextField
				{...register('address')}
				label={t('personalInfo.fields.address')}
				fullWidth
				margin='normal'
				multiline
				rows={3}
				error={!!errors.address}
				helperText={errors.address?.message}
			/>
			<TextField
				{...register('city')}
				label={t('personalInfo.fields.city')}
				fullWidth
				margin='normal'
				error={!!errors.city}
				helperText={errors.city?.message}
			/>
			<TextField
				{...register('state')}
				label={t('personalInfo.fields.state')}
				fullWidth
				margin='normal'
				error={!!errors.state}
				helperText={errors.state?.message}
			/>
			<TextField
				{...register('country')}
				label={t('personalInfo.fields.country')}
				fullWidth
				margin='normal'
				error={!!errors.country}
				helperText={errors.country?.message}
			/>
			<TextField
				{...register('phone')}
				label={t('personalInfo.fields.phone')}
				fullWidth
				margin='normal'
				error={!!errors.phone}
				helperText={errors.phone?.message}
			/>
			<TextField
				{...register('email')}
				label={t('personalInfo.fields.email')}
				fullWidth
				margin='normal'
				error={!!errors.email}
				helperText={errors.email?.message}
			/>
			{/* Show validation summary */}
			{Object.keys(errors).length > 0 && (
				<Alert severity='error' sx={{ mt: 2 }}>
					{t('validation.pleaseFixErrors')}
				</Alert>
			)}
		</Box>
	);
};

export default PersonalInfo;
