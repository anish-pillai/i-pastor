import React from 'react';
import AuthButtons from './AuthButtons';
import { useGoogleLogin } from '@react-oauth/google';

const apiUrl = process.env.REACT_APP_AUTH_URL;
const SignUp: React.FC = () => {
  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log('Sign-Up Success:', credentialResponse);
      // Send token to backend for verification and registration
      fetch(`${apiUrl}/google/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.access_token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User registered:', data);
        })
        .catch((error) => {
          console.error('Error during Google Sign-Up:', error);
        });
    },
    onError: () => {
      console.error('Google Sign-Up Failed');
    },
  });

  const handleGitHubSignUp = () => {
    // Handle GitHub sign-up
  };

  const handleFacebookSignUp = () => {
    // Handle Facebook sign-up
  };

  return (
    <AuthButtons
      title='Sign Up'
      onGoogleClick={handleGoogleSignUp}
      onGitHubClick={handleGitHubSignUp}
      onFacebookClick={handleFacebookSignUp}
    />
  );
};

export default SignUp;
