const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionController');

// router object
const router = express.Router();

// router
// transaction POST method
router.post('/add-transaction', addTransaction);
// transaction POST method
router.post('/get-transaction', getAllTransactions);

module.exports = router;