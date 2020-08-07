const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const keys = require("./keys");

const GoogleTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
    accessToken,
    refreshToken,
    profile,
});

passport.use(new GoogleTokenStrategy({
    clientID: keys.googleAuth.clientID,
    clientSecret: keys.googleAuth.clientSecret,
    callbackURL: 'auth/google/callback',
    proxy: true
}, GoogleTokenStrategyCallback));

export const authenticateGoogle = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('google-token', { session: false }, (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
    })(req, res);
});