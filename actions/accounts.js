const {Accounts} = require('../model/accounts')

const getAccounts = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
  }

  Accounts.find(query, (error, accounts) => {
    if (error) {
      res.status(404).send(error)
    } else {
      res.send(accounts)
    }
  })
}

const getAccount = (req, res) => {
  Accounts.findById(req.params.id,(error, account) => {
    if (error) {
      res.status(404).send(error)
    } else {
      res.send(account)
    }
  })
}

const updateAccount = (req, res) => {
  Accounts.updateOne({ _id: req.params.id }, req.body, (error, result) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.send(result)
    }
  })
}

module.exports = { getAccounts, getAccount, updateAccount}

  