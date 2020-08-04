const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

mongoose.connect('mongodb://localhost/graphql-social-auth', { useNewUrlParser: true });
mongoose.set('debug', true);

const { Schema } = mongoose;

// Create User Schema
const GoogleSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    social: {
        googleProvider: {
            id: String,
            token: String
        }
    }
});

// Model Methods
GoogleSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
    }, 'secret');
};

GoogleSchema.statics.upsertGoogleUser = async function ({ accessToken, refreshToken, profile }) {
    const User = this;

    const user = await User.findOne({ 'social.googleProvider.id': profile.id });

    // no user was found, lets create a new one
    if (!user) {
        const newUser = await User.create({
            name: profile.displayName || `${profile.familyName} ${profile.givenName}`,
            email: profile.emails[0].value,
            'social.googleProvider': {
                id: profile.id,
                token: accessToken,
            },
        });

        return newUser;
    }
    return user;
};

const GoogleUser = mongoose.model('GoogleUser', GoogleSchema);

module.exports = GoogleUser;