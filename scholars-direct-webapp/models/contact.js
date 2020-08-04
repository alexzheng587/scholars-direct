const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    user2: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    blocker_id: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    lastInteractedAt: Date,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}, {
    paranoid: true,
});

export default mongoose.model('Contact', ContactSchema);