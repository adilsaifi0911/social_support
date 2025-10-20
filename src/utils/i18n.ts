// Internationalization (i18n) configuration with i18next and http-backend
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export type SupportedLocale = 'en' | 'ar';

// i18next configuration with http-backend
i18n
	.use(Backend) // loads translations from files
	.use(LanguageDetector) // detects user language
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		// Default language
		lng: 'en',
		// Fallback language if current language translation is missing
		fallbackLng: 'en',
		// Supported languages
		supportedLngs: ['en', 'ar'],
		// Debug mode (set to false in production)
		debug: import.meta.env.DEV,
		// Backend configuration for loading translations
		backend: {
			// Path where resources get loaded from
			loadPath: '/locales/{{lng}}/{{ns}}.json',
			// Allow cross domain requests
			crossDomain: false,
			// Allow credentials on cross domain requests
			withCredentials: false,
			// Override default backend options
			requestOptions: {
				cache: 'default',
			},
		},
		// Language detection options
		detection: {
			// Detection order
			order: ['localStorage', 'navigator', 'htmlTag'],
			// Keys or params to lookup language from
			lookupLocalStorage: 'i18nextLng',
			// Cache user language on
			caches: ['localStorage'],
			// Don't cache if detection fails
			excludeCacheFor: ['cimode'],
		},
		// Translation defaults
		interpolation: {
			// React already does escaping
			escapeValue: false,
		},
		// Default namespace
		defaultNS: 'translation', // name of json file should match
		// Resources will be loaded on demand
		partialBundledLanguages: true,
		// Clean code on production
		cleanCode: true,
		// Load all namespaces for the current language
		preload: ['en'],
		// React options
		react: {
			// Wait for translation loading before rendering
			useSuspense: true,
		},
	});

// Export i18n instance for direct access if needed
export default i18n;
