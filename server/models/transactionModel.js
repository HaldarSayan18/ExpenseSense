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
        required: [true, 'category is required.']
    },
    reference: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'description must be given']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    },
}, { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);