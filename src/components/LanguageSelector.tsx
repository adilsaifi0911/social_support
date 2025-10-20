import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	CircularProgress,
	Box,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
	const { i18n, t } = useTranslation();
	const [isChanging, setIsChanging] = useState(false);

	const handleLanguageChange = async (event: SelectChangeEvent<string>) => {
		const newLocale = event.target.value;
		if (newLocale !== i18n.language) {
			setIsChanging(true);
			try {
				await i18n.changeLanguage(newLocale);
			} finally {
				setIsChanging(false);
			}
		}
	};

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'ar', name: 'العربية' },
	];

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<FormControl size='small' sx={{ minWidth: 120 }} disabled={isChanging}>
				<InputLabel>{t('languageSelector.label')}</InputLabel>
				<Select
					value={i18n.language}
					label={t('languageSelector.label')}
					onChange={handleLanguageChange}
				>
					{languages.map((lang) => (
						<MenuItem key={lang.code} value={lang.code}>
							{lang.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{isChanging && <CircularProgress size={16} />}
		</Box>
	);
};

export default LanguageSelector;
