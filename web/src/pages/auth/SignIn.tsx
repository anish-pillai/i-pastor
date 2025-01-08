import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { verifyGoogleToken } from '../../utils/apiUtils';

const SignIn: React.FC = () => {
  const { login, setUserInfo } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
    try {
      const data = await verifyGoogleToken(credentialResponse);
      const { token, user } = data;
      login(token);
      setUserInfo(user);
      navigate('/');
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSignIn}
      onError={() => console.error('Login Failed')}
      auto_select={true}
    />
  );
};

export default SignIn;
