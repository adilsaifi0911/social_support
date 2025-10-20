import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// Create RTL cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
	key: 'muiltr',
	stylisPlugins: [prefixer],
});

type RTLThemeProviderProps = {
	children: React.ReactNode;
};

const RTLThemeProvider: React.FC<RTLThemeProviderProps> = ({ children }) => {
	const { i18n } = useTranslation();

	// Check if current language is RTL
	const isRTL = useMemo(() => {
		const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
		return rtlLanguages.includes(i18n.language);
	}, [i18n.language]);

	// Set document direction
	useEffect(() => {
		document.body.dir = isRTL ? 'rtl' : 'ltr';
		document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
	}, [isRTL]);

	// Create theme with RTL direction
	const theme = useMemo(
		() =>
			createTheme({
				direction: isRTL ? 'rtl' : 'ltr',
				palette: {
					primary: {
						main: '#1976d2',
					},
					secondary: {
						main: '#dc004e',
					},
				},
				typography: {
					fontFamily: isRTL
						? '"Noto Sans Arabic", "Roboto", "Helvetica", "Arial", sans-serif'
						: '"Roboto", "Helvetica", "Arial", sans-serif',
				},
				components: {
					MuiTextField: {
						styleOverrides: {
							root: {
								'& .MuiInputLabel-root': {
									transformOrigin: isRTL ? 'right' : 'left',
								},
							},
						},
					},
					MuiFormControlLabel: {
						styleOverrides: {
							root: {
								marginLeft: isRTL ? 0 : undefined,
								marginRight: isRTL ? 0 : undefined,
							},
						},
					},
					MuiButton: {
						styleOverrides: {
							root: {
								textTransform: 'none',
							},
						},
					},
					MuiStepper: {
						styleOverrides: {
							root: {
								direction: isRTL ? 'rtl' : 'ltr',
							},
						},
					},
					MuiStepConnector: {
						styleOverrides: {
							alternativeLabel: {
								top: 12,
								left: 'calc(-50% + 20px)',
								right: 'calc(50% + 20px)',
								...(isRTL && {
									left: 'calc(50% + 20px)',
									right: 'calc(-50% + 20px)',
								}),
							},
							line: {
								borderTopWidth: 2,
								borderRadius: 1,
							},
						},
					},
					MuiStepLabel: {
						styleOverrides: {
							alternativeLabel: {
								textAlign: 'center',
								marginTop: 8,
							},
							label: {
								'&.MuiStepLabel-alternativeLabel': {
									marginTop: 8,
								},
							},
						},
					},
				},
			}),
		[isRTL]
	);

	return (
		<CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</CacheProvider>
	);
};

export default RTLThemeProvider;
