const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    body: {
        type: Number,
        allowNull: false,
    },
    sender_id: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    recipient_id: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    thread_id: {
        type: Schema.Types.ObjectID,
        ref: 'message_thread'
    },
    readAt: Date,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}, {
    paranoid: true,
});

// MessageSchema.associate = function associate(models) {
//     MessageSchema.belongsTo(models.user, {
//         as: 'sender',
//         foreignKey: 'sender_id',
//     });
//     Message.belongsTo(models.user, {
//         as: 'recipient',
//         foreignKey: 'recipient_id',
//     });
//     Message.belongsTo(models.message_thread, {
//         as: 'thread',
//         foreignKey: 'thread_id',
//     });
// };

module.exports = mongoose.model('Message', MessageSchema);