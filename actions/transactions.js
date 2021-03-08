const {Trasansactions} = require('../model/transactions')
const {Accounts} = require('../model/accounts')

const createTransactions = (req, res) => {
  const newTrasansactions = new Trasansactions(req.body)
  newTrasansactions.save((error, trasansactionsSaved) => {
    if (error) {
      res.status(422).send(error)
    } else { 
      Accounts.findOne({_id:trasansactionsSaved.accountsId}, (error, sale) => {

        if (error) {
          res.status(500).send(error)
        } else {

          const newBalance = {
            body: {
              balance: sale.balance + req.body.quantity,
            }
          }

          Accounts.updateOne({ _id: trasansactionsSaved.accountsId }, newBalance.body, (error, result) => {
            if (error) {
              res.status(422).send(error)
            } else {
              res.send(result)
            }
          })
        }
      })
      // res.status(201).send(trasansactionsSaved)
    }
  })
}



module.exports = { createTransactions}