import React from 'react';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';

interface AuthButtonsProps {
  title: string;
  onGoogleClick: () => void;
  onGitHubClick: () => void;
  onFacebookClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  title,
  onGoogleClick,
  onGitHubClick,
  onFacebookClick,
}) => {
  return (
    <Box mt={2}>
      <Button
        variant='contained'
        color='primary'
        startIcon={<GoogleIcon />}
        onClick={onGoogleClick}
        fullWidth
        sx={{ mb: 2, color: 'white' }}
      >
        {title} with Google
      </Button>
      <Button
        variant='contained'
        color='primary'
        startIcon={<GitHubIcon />}
        onClick={onGitHubClick}
        fullWidth
        sx={{ mb: 2, color: 'white' }}
      >
        {title} with GitHub
      </Button>
      <Button
        variant='contained'
        color='primary'
        startIcon={<FacebookIcon />}
        onClick={onFacebookClick}
        fullWidth
        sx={{ color: 'white' }}
      >
        {title} with Facebook
      </Button>
    </Box>
  );
};

export default AuthButtons;
