import React from 'react';
// import AuthButtons from './AuthButtons';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_AUTH_URL;
const SignIn: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      fetch(`${apiUrl}/google/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
          provider: 'google',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User data from backend:', data);
          const { authToken } = data;
          login(authToken);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error during Google Sign-In:', error);
        });
    }
  };

  // const handleGitHubSignIn = () => {
  //   // Handle GitHub sign-in
  // };

  // const handleFacebookSignIn = () => {
  //   // Handle Facebook sign-in
  // };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSignIn}
      onError={() => console.error('Login Failed')}
      auto_select={true}
    />
    // <AuthButtons
    //   title='Sign In'
    //   onGoogleClick={handleGoogleSignIn}
    //   onGitHubClick={handleGitHubSignIn}
    //   onFacebookClick={handleFacebookSignIn}
    // />
  );
};

export default SignIn;
