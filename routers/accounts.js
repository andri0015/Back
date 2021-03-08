const express = require('express')
const router = express.Router()
const {getAccount, getAccounts, updateAccount} = require('../actions/accounts')

// GET all
router.get('/', getAccounts)

// GET by ID
router.get('/:id', getAccount)

// PUT Update Account's info
router.put('/:id', updateAccount)
module.exports = router
