const express = require('express')
const router = express.Router()
const { authClient, createClient, getClient, getClients, deleteClient} = require('../actions/clients')
const checkAuthentication = require('../middlewares/checkAuthentication')
const checkAuthorization = require('../middlewares/checkAuthorization')


// GET all
router.get('/', getClients)

// GET by ID
router.get('/:id', checkAuthentication, checkAuthorization, getClient)

// POST Create a Client
router.post('/', createClient)

// POST Authenticate
router.post('/auth', authClient)

// DELETE by ID
router.delete('/:id', deleteClient)

module.exports = router
