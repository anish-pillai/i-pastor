import { CredentialResponse } from '@react-oauth/google';

const apiUrl = process.env.REACT_APP_AUTH_URL;

export const verifyGoogleToken = async (
  credentialResponse: CredentialResponse
) => {
  if (!credentialResponse.credential) {
    throw new Error('Google credential is missing');
  }

  const response = await fetch(`${apiUrl}/google/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: credentialResponse.credential,
      provider: 'google',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to verify Google token');
  }

  return response.json();
};
