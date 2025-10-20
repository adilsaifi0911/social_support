import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Fade,
	Step,
	StepLabel,
	Stepper,
} from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApplication } from '../hooks/useApplication';
import registrationService from '../services/registrationService';

// Lazy load form components for better performance
const PersonalInfo = lazy(() => import('../components/PersonalInfo'));
const FamilyFinancialInfo = lazy(() => import('../components/FamilyFinancialInfo'));
const SituationDescription = lazy(() => import('../components/SituationDescription'));
const ReviewInfo = lazy(() => import('../components/ReviewInfo'));

const stepConfig = [
	{
		id: 'personal-info',
		translationKey: 'navigation.steps.personalInformation',
	},
	{
		id: 'family-financial',
		translationKey: 'navigation.steps.familyFinancialInfo',
	},
	{
		id: 'situation-description',
		translationKey: 'navigation.steps.situationDescriptions',
	},
	{
		id: 'review-submit',
		translationKey: 'navigation.steps.reviewAndSubmit',
	},
];

const RegistrationForm = () => {
	const { t } = useTranslation();
	const {
		currentStep,
		setCurrentStep,
		validateCurrentStep,
		resetApplication,
		applicationData,
	} = useApplication();
	const dialogs = useDialogs();
	const [isLoading, setIsLoading] = useState(false);

	// Steps array for stepper
	const steps = stepConfig.map((step) => t(step.translationKey));

	// Handle next step with validation
	const handleNext = useCallback(async () => {
		const isValid = await validateCurrentStep();
		if (isValid) {
			setCurrentStep(currentStep + 1);
		}
	}, [currentStep, setCurrentStep, validateCurrentStep]);

	const handleSubmit = async () => {
		setIsLoading(true); // Set loading state
		// Handle form submission
		const response =
			await registrationService.postRegistrationData(applicationData);
		setIsLoading(false); // Reset loading state
		if (response.status) {
			// Handle successful registration
			const confirmed = await dialogs.confirm(
				`${response.data} Do you want to fill another form ?`,
				{
					okText: 'Yes',
					cancelText: 'No',
				}
			);
			resetApplication();
			if (confirmed) setCurrentStep(0);
		} else {
			// Handle registration error
			dialogs.alert(response.message);
		}
	};

	// Current step component rendering with lazy loading
	const renderCurrentStep = useMemo(() => {
		const ComponentFallback = () => (
			<Box 
				display="flex" 
				justifyContent="center" 
				alignItems="center" 
				minHeight="200px"
			>
				<CircularProgress />
			</Box>
		);

		switch (currentStep) {
			case 0:
				return (
					<Suspense fallback={<ComponentFallback />}>
						<PersonalInfo />
					</Suspense>
				);
			case 1:
				return (
					<Suspense fallback={<ComponentFallback />}>
						<FamilyFinancialInfo />
					</Suspense>
				);
			case 2:
				return (
					<Suspense fallback={<ComponentFallback />}>
						<SituationDescription />
					</Suspense>
				);
			case 3:
				return (
					<Suspense fallback={<ComponentFallback />}>
						<ReviewInfo />
					</Suspense>
				);
			default:
				return null;
		}
	}, [currentStep]);

	const bottomButtons = () => {
		if (currentStep >= steps.length) return null;
		const isFinalStep = currentStep === steps.length - 1;

		return (
			<Box display={'flex'} justifyContent={'space-between'} sx={{ mt: 2 }}>
				<Button
					variant='contained'
					onClick={() => {
						if (currentStep === 0) {
							resetApplication();
							return;
						}
						setCurrentStep(currentStep - 1);
					}}
				>
					{t('navigation.buttons.back')}
				</Button>
				<Button
					variant='contained'
					onClick={isFinalStep ? handleSubmit : handleNext}
					color={isFinalStep ? 'success' : 'primary'}
				>
					{isFinalStep
						? t('navigation.buttons.submit')
						: t('navigation.buttons.next')}
				</Button>
			</Box>
		);
	};

	return (
		<>
			<Fade in timeout={1000}>
				<Stepper
					activeStep={currentStep}
					alternativeLabel
					sx={{
						'& .MuiStepLabel-label': {
							fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
							marginTop: { xs: 1, sm: 1.5 },
							textAlign: 'center',
							transition: 'all 0.3s ease',
						},
						'& .MuiStepLabel-labelContainer': {
							width: '100%',
						},
						'& .MuiStep-root': {
							padding: { xs: 0, sm: '0 8px' },
						},
						'& .MuiStepConnector-root': {
							top: '12px',
							transition: 'all 0.3s ease',
							'& .MuiStepConnector-line': {
								minHeight: '2px',
								borderTopWidth: '2px',
								borderRadius: '1px',
								transition: 'border-color 0.3s ease',
							},
						},
						'& .MuiStepIcon-root': {
							transition: 'all 0.3s ease',
						},
						mb: { xs: 2, sm: 3 },
						width: '100%',
						overflow: 'hidden',
					}}
				>
					{steps.map((label, index) => (
						<Step key={`${stepConfig[index]?.id}-${index}`}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</Fade>
			<Box
				sx={{
					p: { xs: 1, sm: 2, md: 3 },
					maxWidth: '100%',
					overflow: 'hidden',
				}}
			>
				{renderCurrentStep}
				{bottomButtons()}
			</Box>
			<Backdrop
				sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
				open={isLoading}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</>
	);
};

export default RegistrationForm;
