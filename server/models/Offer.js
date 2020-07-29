const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Question = require('../models/Question');
let User = require('../models/User');
const offerSchema = new Schema({

    from: {
        type: String,
        // required: true
    },
    to: {
        type: String,
        // required: true
    },
    question: {
        type: String,
        // required: true
    },
    detail: {
        type: String
    },
    time: {
        type: Date
    },
    status: {
        type: String,
        default: "IN_PROGRESS"
    }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;

