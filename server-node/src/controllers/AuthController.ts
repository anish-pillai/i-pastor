import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../db/entity/User';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (req: Request, res: Response) => {
  const { token, provider } = req.body;

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

    // Extract user information from Google payload
    const { sub, email, name, picture } = payload; // 'sub' is Google's unique user ID

    const userRepository = AppDataSource.getRepository(User);

    // Check if a user with this email already exists
    let user = await userRepository.findOne({
      where: { email: email },
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
        email,
        name,
        picture,
        role: 'gold', // Default role
        provider,
        providerId: sub,
      });
      await userRepository.save(user);
    }
    // Generate your own JWT
    const jwtToken = jwt.sign(
      { id: sub, email, name, picture },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ message: 'User verified', user: user, token: jwtToken });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
