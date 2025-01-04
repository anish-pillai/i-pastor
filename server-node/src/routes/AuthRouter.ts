import express, { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import { verifyGoogleToken, getUserInfo } from '../controllers/AuthController';
import '../controllers/AuthController'; // Import Google strategy configuration

const authRouter: Router = express.Router();

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
authRouter.post('/google/verify', verifyGoogleToken);

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
authRouter.get('/user', getUserInfo);

export default authRouter;
