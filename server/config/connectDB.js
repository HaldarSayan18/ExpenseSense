const mongoose = require('mongoose');
const {bgRed} = require('colors');

const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.DBCONNECT_URL);
        console.log(`Database Running on ${mongoose.connection.host}`.bgMagenta);
    } catch (error) {
        console("Error in connecting database.");
        console.log(`${error}`.bgRed);
    }
};

module.exports = connectDB;