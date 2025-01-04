import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Configure the Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user information here (e.g., save to DB)
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user (for session support)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
