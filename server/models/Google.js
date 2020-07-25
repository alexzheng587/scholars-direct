const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const googleSchema = new Schema({
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String
    },
    birthday: {
        type: Date
    },
    role: {
        type: String,
        required: true
    },
    googleProvider: {
        type: {
            id: String,
            token: String
        },

        select: false
    }
});

googleSchema.set('toJSON', {getters: true, virtuals: true});

googleSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
    const that = this;
    return this.findOne({
        'googleProvider.id': profile.id
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            console.log(profile)
            const newUser = new that({
                name: profile.displayName,
                email: profile.emails[0].value,
                role: "STUDENT",
                googleProvider: {
                    id: profile.id,
                    token: accessToken
                }
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};
const Google = mongoose.model('Google', googleSchema);

module.exports = Google;