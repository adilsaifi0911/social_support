import { yupResolver } from '@hookform/resolvers/yup';
import type { PropsWithChildren } from 'react';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { applicationDataDefaults } from '../data/defaultData';
import familyFinancialSchema from '../schema/familyFinancialSchema';
import personalInfoSchema from '../schema/personalInfoSchema';
import situationDescriptionSchema from '../schema/situationDescriptionSchema';
import type {
	ApplicationFormDataType,
	FamilyFinancialDataType,
	PersonalInfoDataType,
	SituationDescriptionDataType,
} from '../types/applicationFormDataType';

export type ApplicationContextType = {
	// Form data
	applicationData: ApplicationFormDataType;
	// Form methods for each step
	personalInfoForm: UseFormReturn<PersonalInfoDataType>;
	familyFinancialForm: UseFormReturn<FamilyFinancialDataType>;
	situationDescriptionForm: UseFormReturn<SituationDescriptionDataType>;
	// Navigation state
	currentStep: number;
	setCurrentStep: (step: number) => void;
	// Form validation
	validateCurrentStep: () => Promise<boolean>;
	// Reset
	resetApplication: () => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
	undefined
);

export const ApplicationProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	// Application data state
	const [applicationData, setApplicationData] =
		useState<ApplicationFormDataType>(() => {
			// Try to load from localStorage on initialization
			const saved = localStorage.getItem('socialSupportApplication');
			if (saved) {
				try {
					return JSON.parse(saved);
				} catch (error) {
					console.error('Failed to parse saved application data:', error);
				}
			}
			return applicationDataDefaults;
		});

	// Current step state
	const [currentStep, setCurrentStep] = useState(() => {
		// Try to load from localStorage on initialization
		const saved = localStorage.getItem('socialSupportApplicationStep');
		if (saved) {
			try {
				return +saved;
			} catch (error) {
				console.error('Failed to parse saved application data:', error);
			}
		}
		return -1;
	});

	// Form instances for each step with validation
	const personalInfoForm = useForm<PersonalInfoDataType>({
		resolver: yupResolver(personalInfoSchema),
		defaultValues: applicationData.personalInfo,
		mode: 'onChange',
	});

	const familyFinancialForm = useForm<FamilyFinancialDataType>({
		resolver: yupResolver(familyFinancialSchema),
		defaultValues: applicationData.familyFinancialInfo,
		mode: 'onChange',
	});

	const situationDescriptionForm = useForm<SituationDescriptionDataType>({
		resolver: yupResolver(situationDescriptionSchema),
		defaultValues: applicationData.situationDescription,
		mode: 'onChange',
	});

	// Validation function for current step
	const validateCurrentStep = useCallback(async (): Promise<boolean> => {
		let stepValid = false;
		switch (currentStep) {
			case 0:
				stepValid = await personalInfoForm.trigger();
				if (stepValid) {
					setApplicationData((prev) => ({
						...prev,
						personalInfo: personalInfoForm.getValues(),
					}));
				}
				break;
			case 1:
				stepValid = await familyFinancialForm.trigger();
				if (stepValid) {
					setApplicationData((prev) => ({
						...prev,
						familyFinancialInfo: familyFinancialForm.getValues(),
					}));
				}
				break;
			case 2:
				stepValid = await situationDescriptionForm.trigger();
				if (stepValid) {
					setApplicationData((prev) => ({
						...prev,
						situationDescription: situationDescriptionForm.getValues(),
					}));
				}
				break;
			default:
				return true;
		}
		return stepValid;
	}, [
		currentStep,
		personalInfoForm,
		familyFinancialForm,
		situationDescriptionForm,
	]);

	// Reset application
	const resetApplication = useCallback(() => {
		setApplicationData(applicationDataDefaults);
		setCurrentStep(-1);
		personalInfoForm.reset(applicationDataDefaults.personalInfo);
		familyFinancialForm.reset(applicationDataDefaults.familyFinancialInfo);
		situationDescriptionForm.reset(
			applicationDataDefaults.situationDescription
		);
		localStorage.removeItem('socialSupportApplication');
		localStorage.removeItem('socialSupportApplicationStep');
	}, [personalInfoForm, familyFinancialForm, situationDescriptionForm]);

	// Auto-save to localStorage when data changes
	React.useEffect(() => {
		try {
			localStorage.setItem(
				'socialSupportApplication',
				JSON.stringify(applicationData)
			);
		} catch (error) {
			console.error('Failed to save application data:', error);
		}
	}, [applicationData]);

	useEffect(() => {
		try {
			localStorage.setItem(
				'socialSupportApplicationStep',
				currentStep.toString()
			);
		} catch (error) {
			console.error('Failed to save application step:', error);
		}
	}, [currentStep]);

	const contextValue: ApplicationContextType = {
		applicationData,
		personalInfoForm,
		familyFinancialForm,
		situationDescriptionForm,
		currentStep,
		setCurrentStep,
		validateCurrentStep,
		resetApplication,
	};

	return (
		<ApplicationContext.Provider value={contextValue}>
			{children}
		</ApplicationContext.Provider>
	);
};

export default ApplicationContext;
