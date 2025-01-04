import express, { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import './GoogleAuth'; // Import Google strategy configuration
import { User } from '../db/entity/User';
import { AppDataSource } from '../data-source';
const authRouter: Router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Generate Session Secret [SESSION_SECRET]
 * node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */
// Use sessions for maintaining login state
authRouter.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

// POST route to verify Google token
authRouter.post('/google/verify', async (req, res) => {
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
});

// Route to trigger Google OAuth
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route for Google OAuth
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login
    res.redirect('/'); // Redirect to a dashboard or home page
  }
);

// Route to get authenticated user info
authRouter.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default authRouter;
