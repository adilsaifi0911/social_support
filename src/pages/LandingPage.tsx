import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApplication } from '../hooks/useApplication';

const LandingPage = () => {
	const { t } = useTranslation();
	const { setCurrentStep } = useApplication();
	return (
		<>
			<Box
				sx={{
					textAlign: 'center',
					margin: { xs: 1, sm: 2 },
					fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.9rem' },
					px: { xs: 1, sm: 0 },
				}}
			>
				<Typography variant='h6' gutterBottom>
					{t('app.landing')}
				</Typography>
				<Typography variant='body1'>{t('app.landingSubtitle')}</Typography>
			</Box>
			<Box
				sx={{
					p: { xs: 1, sm: 2, md: 3 },
					maxWidth: '100%',
					overflow: 'hidden',
				}}
			>
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
					<Button variant='outlined' onClick={() => setCurrentStep(0)}>
						{t('navigation.buttons.start')}
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default LandingPage;
