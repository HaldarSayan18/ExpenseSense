const Transaction = require('../models/transactionModel');
const moment = require('moment');

// const getAllTransactions = async (req, res) => {
//     try {
//         const { frequency, selectedDate, type } = req.body;
//         const allTransactions = await Transaction .find({
//             // frequency type "custom"
//             ...(frequency !== 'custom' ? {
//                 date: {
//                     $gt: moment().subtract(Number(frequency), 'd').toDate(),
//                 },
//             } : {
//                 date: {
//                     $gte: selectedDate[0],
//                     $lte: selectedDate[1],
//                 }
//             }),
//             userid: req.body.userid,
//             // for type
//             ...(type !== 'all' && {type}),
//         });
//         res.status(200).json(allTransactions);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// };

const getAllTransactions = async (req, res) => {
    try {
        const { frequency, selectedDate, type, userid } = req.body;
        console.log("Backend received:", req.body);

        const transactions = await Transaction.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate(),
                },
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1],
                }
            }),
            userid: userid,
            ...(type && type !== 'all' && { type }),
        });

        console.log("Fetched transactions:", transactions);
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error in getAllTransactions:", error);
        res.status(500).json(error);
    }
};

const addTransaction = async (req, res) => {
    try {
        console.log('req.body-add-transaction', req.body);
        // String date to Date object
        req.body.date = new Date(req.body.date);
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction created..");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { getAllTransactions, addTransaction };