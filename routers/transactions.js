const express = require('express')
const router = express.Router()
const {createTransactions} = require('../actions/transactions')

// POST Create a Transactions
router.post('/', createTransactions)

module.exports = router
