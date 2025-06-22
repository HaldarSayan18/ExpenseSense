const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connectDB');

// congit .env file
dotenv.config();
// database call
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev')); // tiny urls
app.use(cors());

// routes
app.use('/api/version/users', require('./routes/userRoute'));   //users route
app.use('/api/version/transactions', require('./routes/transactionRoute'));     //transactions route

// port
const PORT = 8050 || process.env.PORT;

// server listen
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}/`.bgYellow);
});