const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new mongoose.Schema({
  clientsId: { type: Schema.Types.ObjectId, required: true, ref: 'clients' },
  balance: { type: Number, required: true, default: 0, min:0},
  date: {type: Date, default: Date.now}
})
const Accounts = mongoose.model('accounts', accountSchema)

module.exports.Accounts = Accounts