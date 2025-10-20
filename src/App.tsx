import { Box, Container, Fade, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import { useApplication } from './hooks/useApplication';
import LandingPage from './pages/LandingPage';
import RegistrationForm from './pages/RegistrationForm';

const App = () => {
	const { t } = useTranslation();
	const { currentStep } = useApplication();

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				px: { xs: 1, sm: 2, md: 3 },
				py: { xs: 1, sm: 2 },
			}}
		>
			<Container
				maxWidth='md'
				sx={{
					width: '100%',
					maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: '900px' },
				}}
			>
				<Fade in timeout={600}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
						<LanguageSelector />
					</Box>
				</Fade>

				<Fade in timeout={800}>
					<Typography
						variant='h4'
						sx={{
							textAlign: 'center',
							margin: { xs: 1, sm: 2 },
							fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
							px: { xs: 1, sm: 0 },
						}}
					>
						{t('app.title')}
					</Typography>
				</Fade>
				{currentStep > -1 ? <RegistrationForm /> : <LandingPage />}
			</Container>
		</Box>
	);
};

export default App;
