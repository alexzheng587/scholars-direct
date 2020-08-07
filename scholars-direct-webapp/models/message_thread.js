var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageThreadSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    user2: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    messages: [{
        type: Schema.Types.ObjectID,
        ref: 'Message'
    }],
    contactId: {
        type: Schema.Types.ObjectID,
        ref:'Contact'
    },
    lastMessageAt: Date,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}, {
    paranoid: true,
});

// MessageThread.associate = function associate(models) {
//     MessageThread.belongsTo(models.user, {
//         foreignKey: 'user_1',
//         as: 'user1',
//     });
//     MessageThread.belongsTo(models.user, {
//         foreignKey: 'user_2',
//         as: 'user2',
//     });
//     MessageThread.belongsTo(models.contact, {
//         foreignKey: 'contact_id',
//         as: 'contact',
//     });
//     MessageThread.hasMany(models.message, {
//         foreignKey: 'thread_id',
//         as: 'messages',
//     });
// };

export default mongoose.model('MessageThread', MessageThreadSchema, 'messagethreads');