import { Box, CircularProgress, Typography, LinearProgress } from '@mui/material';
import { Language } from '@mui/icons-material';

const TranslationLoader = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      gap: 3,
      px: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
      }}
    >
      <Language color="primary" sx={{ fontSize: 40 }} />
      <Typography variant="h5" color="primary" fontWeight="500">
        Government Social Support
      </Typography>
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <CircularProgress size={24} />
      <Typography variant="body1" color="text.secondary">
        Loading translations...
      </Typography>
    </Box>
    
    <Box sx={{ width: '100%', maxWidth: 300 }}>
      <LinearProgress />
    </Box>
    
    <Typography variant="caption" color="text.disabled" textAlign="center">
      Please wait while we prepare the application in your language
    </Typography>
  </Box>
);

export default TranslationLoader;