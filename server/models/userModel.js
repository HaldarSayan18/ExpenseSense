const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'full name is required.']
    },
    email: {
        type: String,
        require: [true, 'your email is required.'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'password is required.']
    },
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;