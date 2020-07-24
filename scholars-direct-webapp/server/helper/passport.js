import { GraphQLLocalStrategy } from 'graphql-passport';
import passport from 'passport'
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretKey';
const initPassport = ({ User }) => {
    // passport.use(
    //     new JwtStrategy(opts, (jwt_payload, done) => {
    //         User.findById(jwt_payload.id)
    //             .then(user => {
    //                 if (user) {
    //                     return done(null, user);
    //                 }
    //                 return done(null, false);
    //             })
    //             .catch(err => console.log(err));
    //     })
    // );

    passport.use(
        new GraphQLLocalStrategy(async (email, password, done) => {
            const user = await User.findOne({ $or: [{email: email}, {username: email}]});
            if (!user) return done(new Error('no matching user'), false);
            if (!(await User.comparePassword(password, user.password))) return done(new Error('incorrect password'), false);
            return done(null, user);
        })
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};

export default initPassport;