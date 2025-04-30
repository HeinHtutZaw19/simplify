import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.email); // or user._id if you prefer
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            // Prevent login
            return done(null, false, { message: 'User not found' });
        }

        // Log in existing user
        return done(null, existingUser);
    } catch (err) {
        return done(err, null);
    }
}));
