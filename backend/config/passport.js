import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.email);
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
    callbackURL: process.env.NODE_ENV == 'production' ? 'https://simplify-f1978ef8a491.herokuapp.com/' : 'http://localhost:4000/api/login/google/callback',
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            console.log('google user email clicked:', email)
            const existingUser = await User.findOne({ email: email });
            if (!existingUser) {
                // Prevent login
                console.log('google oauth: email not found')
                return done(null, null, { message: 'User email not found' });
            }

            // Log in existing user
            return done(null, existingUser);
        } catch (err) {
            return done(err, null);
        }
    }));
