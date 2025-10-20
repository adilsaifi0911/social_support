import { HelpOutline } from '@mui/icons-material';
import {
	Alert,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	TextField,
	Typography,
} from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApplication } from '../hooks/useApplication';
import aiService from '../services/aiService';
import type { SituationDescriptionDataType } from '../types/applicationFormDataType';
import Confirmation from './Confirmation';

// Step 3 - Situation Descriptions with AI Assistance
const SituationDescription = () => {
	const { t } = useTranslation();
	const { situationDescriptionForm, familyFinancialForm } = useApplication();
	const dialogs = useDialogs();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		formState: { errors },
		setValue,
		setFocus,
	} = situationDescriptionForm;

	const familyFinancialValues = familyFinancialForm.getValues();

	const aboutMe = `I am ${familyFinancialValues.maritalStatus}, have ${familyFinancialValues.dependents} dependents, housing status is ${familyFinancialValues.housingStatus}, employment is ${familyFinancialValues.employmentStatus} and my total monthly income is ${familyFinancialValues.monthlyIncome}.`;

	const userPrompt: Record<keyof SituationDescriptionDataType, string> = {
		currentFinancialSituation: `help me describe my current financial situation. ${aboutMe}.`,
		employmentCircumstances: `help me describe my employment circumstances. ${aboutMe}.`,
		reasonForApplying: `help me describe my reason for applying for social support. ${aboutMe}.`,
	};

	const onCloseDialog = async ({
		accepted,
		rejected,
		edited,
		category,
		text,
	}: {
		accepted?: boolean;
		rejected?: boolean;
		edited?: boolean;
		category: keyof SituationDescriptionDataType;
		text?: string;
	}) => {
		if (accepted) {
			setValue(category, text || '');
			// Set Focus on Next Field
			setFocus(
				category === 'currentFinancialSituation'
					? 'employmentCircumstances'
					: category === 'employmentCircumstances'
						? 'reasonForApplying'
						: 'reasonForApplying'
			);
		} else if (rejected) {
			// Set focus back to the same field
			setFocus(category);
		} else if (edited) {
			// Set Value and Focus back to the same field
			setValue(category, text || '');
			setFocus(category);
		}
	};

	const handleAI = async (field: keyof SituationDescriptionDataType) => {
		setIsLoading(true); // Wait for OpenAI to respond
		const response = await aiService.getAIResponse(field, userPrompt[field]);
		setIsLoading(false); // Enable UI after OpenAI response

		if (response?.status && response?.data) {
			await dialogs.open(
				Confirmation,
				{ text: response.data || 'No response from AI.', category: field },
				{
					onClose: onCloseDialog,
				}
			);
			return;
		} else {
			dialogs.alert('Failed to get AI suggestion. Please try again later.');
			console.error('AI service error:', response.message);
		}
	};

	return (
		<Box>
			<Typography variant='h6' sx={{ mb: 2 }}>
				{t('situationDescription.title')}
			</Typography>
			<TextField
				{...register('currentFinancialSituation')}
				label={t('situationDescription.fields.currentFinancialSituation')}
				multiline
				rows={4}
				fullWidth
				margin='normal'
				error={!!errors.currentFinancialSituation}
				helperText={errors.currentFinancialSituation?.message}
			/>
			<Button
				variant='outlined'
				color='primary'
				onClick={() => handleAI('currentFinancialSituation')}
				startIcon={<HelpOutline />}
				sx={{ mb: 2 }}
			>
				{t('navigation.buttons.helpMeWrite')}
			</Button>

			<TextField
				{...register('employmentCircumstances')}
				label={t('situationDescription.fields.employmentCircumstances')}
				multiline
				rows={4}
				fullWidth
				margin='normal'
				error={!!errors.employmentCircumstances}
				helperText={errors.employmentCircumstances?.message}
			/>
			<Button
				variant='outlined'
				color='primary'
				onClick={() => handleAI('employmentCircumstances')}
				startIcon={<HelpOutline />}
				sx={{ mb: 2 }}
			>
				{t('navigation.buttons.helpMeWrite')}
			</Button>

			<TextField
				{...register('reasonForApplying')}
				label={t('situationDescription.fields.reasonForApplying')}
				multiline
				rows={4}
				fullWidth
				margin='normal'
				error={!!errors.reasonForApplying}
				helperText={errors.reasonForApplying?.message}
			/>
			<Button
				variant='outlined'
				color='primary'
				onClick={() => handleAI('reasonForApplying')}
				startIcon={<HelpOutline />}
				sx={{ mb: 2 }}
			>
				{t('navigation.buttons.helpMeWrite')}
			</Button>

			{/* Show validation summary */}
			{Object.keys(errors).length > 0 && (
				<Alert severity='error' sx={{ mt: 2 }}>
					{t('validation.pleaseFixErrors')}
				</Alert>
			)}
			<Backdrop
				sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
				open={isLoading}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</Box>
	);
};

export default SituationDescription;
