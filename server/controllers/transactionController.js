const transactionSchema = require('../models/transactionModel');
const moment = require('moment');

const getAllTransactions = async (req, res) => {
    try {
        const { frequency, selectedDate } = req.body;
        const allTransactions = await transactionSchema.find({
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
            userid: req.body.userid
        });
        res.status(200).json(allTransactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionSchema(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction created..");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { getAllTransactions, addTransaction };