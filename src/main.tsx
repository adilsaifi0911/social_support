import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import TranslationLoader from './components/TranslationLoader.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { ApplicationProvider } from './context/ApplicationContext.tsx';
import { DialogsProvider } from '@toolpad/core/useDialogs';

import RTLThemeProvider from './theme/RTLThemeProvider.tsx';

import './index.css';
import './utils/i18n';

// Get the root element
const rootElement = document.getElementById('root');
if (!rootElement) {
	throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<ErrorBoundary>
			<Suspense fallback={<TranslationLoader />}>
				<RTLThemeProvider>
					<ApplicationProvider>
						<DialogsProvider>
							<App />
						</DialogsProvider>
					</ApplicationProvider>
				</RTLThemeProvider>
			</Suspense>
		</ErrorBoundary>
	</StrictMode>
);
