import findOrCreate from 'mongoose-find-or-create';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'none'
    },

    // new informations
    school: {
        type: String,
        default: 'none'
    },
    major: {
        type: String,
        default: 'none'
    },
    year: {
        type: Number,
        default: 0
    },
    fullname: {
        type: String,
        default: 'none'
    },

    lastInteractedAt: Date,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    }, {
    paranoid: true
});

UserSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('update', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.comparePassword = function(candidatePassword, actualPassword) {
    return bcrypt.compare(candidatePassword, actualPassword);
};

UserSchema.plugin(findOrCreate);

export default mongoose.model('User', UserSchema);