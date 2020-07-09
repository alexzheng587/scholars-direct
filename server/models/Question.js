const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    message: {
        type: String
    },
    user: {
        type: String
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;