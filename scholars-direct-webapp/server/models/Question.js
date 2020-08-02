const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String
    },
    username: {
        type: String
    },
    description: {
        type: String
    },
    time: {
        type: String
    },
    status: {
        type: String
    },
    tags: {
        type: [
            String
        ]
    }
});

export default mongoose.model('Question', questionSchema);