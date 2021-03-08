const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trasansactionSchema = new mongoose.Schema({
  accountsId: { type: Schema.Types.ObjectId, required: true, ref: 'accounts' },
  quantity: { type: Number, required: true},
  date: {type: Date, default: Date.now}
})
const Trasansactions = mongoose.model('trasansactions', trasansactionSchema)

module.exports.Trasansactions = Trasansactions