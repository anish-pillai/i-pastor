import { Container, Typography, Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeStore } from '../../store/themeStore';
import SignIn from './SignIn';

const AuthLayout = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleTheme);

  return (
    <Container maxWidth='sm'>
      <Box position='absolute' top={16} right={16}>
        <IconButton onClick={toggleDarkMode}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <Box textAlign='center' my={4}>
        <img
          src='/logo.png'
          alt='iPastor Logo'
          style={{ width: '150px', marginBottom: '16px' }}
        />
        <Typography variant='h4' gutterBottom>
          Welcome to iPastor
        </Typography>
        <Typography variant='body1' color='textSecondary' gutterBottom>
          iPastor is your personal assistant for managing church activities and
          events.
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
};

export default AuthLayout;
