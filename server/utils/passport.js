import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/user/auth/google/callback`,
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
            passReqToCallback: true
        },
        (accessToken, refreshToken, profile, cb) => {
            return cb(null, profile);
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

export default passport;
