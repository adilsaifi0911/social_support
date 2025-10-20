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
import { useEffect } from 'react';

// Step 2 - Family & Financial Info Fields
const FamilyFinancialInfo = () => {
	const { t } = useTranslation();
	const { familyFinancialForm } = useApplication();

	const {
		register,
		formState: { errors },
		setFocus,
	} = familyFinancialForm;

	const maritalStatusOptions = useOptions('maritalStatusOptions');
	const employmentStatusOptions = useOptions('employmentStatusOptions');
	const housingStatusOptions = useOptions('housingStatusOptions');

	useEffect(() => {
		setFocus('maritalStatus');
	}, [setFocus]);

	return (
		<Box>
			<Typography variant='h6' sx={{ mb: 2 }}>
				{t('familyFinancialInfo.title')}
			</Typography>
			<FormControl fullWidth margin='normal' error={!!errors.maritalStatus}>
				<InputLabel>{t('familyFinancialInfo.fields.maritalStatus')}</InputLabel>
				<Controller
					name='maritalStatus'
					control={familyFinancialForm.control}
					render={({ field }) => (
						<Select
							{...field}
							label={t('familyFinancialInfo.fields.maritalStatus')}
						>
							{maritalStatusOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.maritalStatus && (
					<Typography color='error' variant='caption'>
						{errors.maritalStatus.message as string}
					</Typography>
				)}
			</FormControl>
			<TextField
				{...register('dependents', { valueAsNumber: true })}
				label={t('familyFinancialInfo.fields.dependents')}
				type='number'
				fullWidth
				margin='normal'
				error={!!errors.dependents}
				helperText={errors.dependents?.message}
			/>
			<FormControl fullWidth margin='normal' error={!!errors.employmentStatus}>
				<InputLabel>
					{t('familyFinancialInfo.fields.employmentStatus')}
				</InputLabel>
				<Controller
					name='employmentStatus'
					control={familyFinancialForm.control}
					render={({ field }) => (
						<Select
							{...field}
							label={t('familyFinancialInfo.fields.employmentStatus')}
						>
							{employmentStatusOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.employmentStatus && (
					<Typography color='error' variant='caption'>
						{errors.employmentStatus.message as string}
					</Typography>
				)}
			</FormControl>
			<TextField
				{...register('monthlyIncome', { valueAsNumber: true })}
				label={t('familyFinancialInfo.fields.monthlyIncome')}
				type='number'
				fullWidth
				margin='normal'
				error={!!errors.monthlyIncome}
				helperText={errors.monthlyIncome?.message}
			/>
			<FormControl fullWidth margin='normal' error={!!errors.housingStatus}>
				<InputLabel>{t('familyFinancialInfo.fields.housingStatus')}</InputLabel>
				<Controller
					name='housingStatus'
					control={familyFinancialForm.control}
					render={({ field }) => (
						<Select
							{...field}
							label={t('familyFinancialInfo.fields.housingStatus')}
						>
							{housingStatusOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					)}
				/>
				{errors.housingStatus && (
					<Typography color='error' variant='caption'>
						{errors.housingStatus.message as string}
					</Typography>
				)}
			</FormControl>

			{/* Show validation summary */}
			{Object.keys(errors).length > 0 && (
				<Alert severity='error' sx={{ mt: 2 }}>
					{t('validation.pleaseFixErrors')}
				</Alert>
			)}
		</Box>
	);
};

export default FamilyFinancialInfo;
