import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeStore } from '../../store/themeStore';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthLayout: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleTheme);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

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
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label='Sign In' />
          <Tab label='Sign Up' />
        </Tabs>
        {tabIndex === 0 && <SignIn />}
        {tabIndex === 1 && <SignUp />}
      </Box>
    </Container>
  );
};

export default AuthLayout;
