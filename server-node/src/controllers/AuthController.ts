import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../db/entity/User';
import { AppDataSource } from '../data-source';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (req: Request, res: Response) => {
  const { token, provider, authToken } = req.body;

  if (!provider) {
    return res.status(400).json({ message: 'Provider is required' });
  }

  try {
    let ticket;
    if (provider === 'google') {
      ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } else {
      return res.status(400).json({ message: 'Unsupported provider' });
    }

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    const userRepository = AppDataSource.getRepository(User);

    // Check if a user with this email already exists
    let user = await userRepository.findOne({
      where: { email: payload.email },
    });

    if (user) {
      if (user.provider !== provider) {
        return res.status(400).json({
          message: `This email is already registered with ${user.provider}. Please use ${user.provider} to sign in.`,
        });
      }
    } else {
      // Create a new user if no existing user found
      user = userRepository.create({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        role: 'gold', // Default role
        provider,
        providerId: payload.sub,
      });
      await userRepository.save(user);
    }
    console.log('authToken:', authToken);
    res.json({ message: 'User verified', user: user.id, authToken: token });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const getUserInfo = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
