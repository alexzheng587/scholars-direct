const User = require('./user');
const Message = require('./message');
const MessageThread = require('./message_thread');

const mongoose = require('mongoose');
const server = 'cluster0-htlvb.mongodb.net'; // REPLACE WITH YOUR DB SERVER
const database = 'ScholarsDirect';      // REPLACE WITH YOUR DB NAME

const mongodb = mongoose.connect(`mongodb+srv://m001-student:m001-mongodb-basics@${server}/${database}`)
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    });

const models = {};

[
    User,
    Message,
    MessageThread,
].forEach((model)=> {
    models[model.modelName] = model;
});

models._mongoose = mongodb;

export default models;