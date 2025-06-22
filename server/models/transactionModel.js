const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'amount must be inserted.']
    },
    category: {
        type: String,
        require: [true, 'category is required.']
    },
    reference: {
        type: String
    },
    description: {
        type: String,
        require: [true, 'description must be given']
    },
    date: {
        type: String,
        required: [true, 'data is required']
    },
}, { timestamps: true }
);

module.exports = transactionSchema;