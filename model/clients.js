const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PROJECTION = ['name', 'document', 'address', 'telephone', 'email', 'createdAt', 'updatedAt']

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  document: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: {type: Date, default: Date.now}
})
const Clients = mongoose.model('clients', clientSchema)

module.exports = { Clients, PROJECTION }