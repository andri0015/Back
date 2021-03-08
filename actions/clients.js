const { Clients, PROJECTION } = require('../model/clients')
const {Accounts} = require('../model/accounts')
const bcrypt = require('bcryptjs')
const { currentClient, generateToken } = require('../utils/jwt')

const authClient = (req, res) => {
  Clients.findOne({ document: req.body.document }, (error, client) => {
    try {
      if (error) {
        res.status(422).send(error)
      } else if (client && bcrypt.compareSync(req.body.password, client.password)) { // Si el cliente es encontrado, debemos construir y devolver la llave (JWT)
        res.status(201).send({ jwt: generateToken(client) })
      } else { // Cuando el cliente esta vacio, es decir, cuando no se encontró
        res.status(401).send({ msg: 'Invalid user or password' })
      }
    } catch (error) {
      res.status(422).send(error)
    }
  })
}

const getClients = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
  }

  Clients.find(query, PROJECTION, (error, clients) => {
    if (error) {
      res.status(404).send(error)
    } else {
      res.send(clients)
    }
  })
}

const deleteClient = (id) => {
  Clients.findByIdAndDelete(id, (error, result) => {
    if (error) {
      return error
    } else {
      return result
    }
  })
}

const createClient = (req, res) => {
  // Encriptación de la contraseña
  const passw = req.body.password
  req.body.password = bcrypt.hashSync(req.body.password)

  const newClient = new Clients(req.body)
  newClient.save((error, clientSaved) => {
    if (error) {
      res.status(422).send(error)
    } else {
      // Pasos necesarios para no devolver el campo password
      let client = clientSaved.toObject()
      delete client.password
      const accountSchema = new Accounts({
        clientsId: clientSaved._id,
        balance: req.body.balance,
      })
      accountSchema.save((error, accountSave) => {
        if (error) {
          deleteClient(clientSaved._id)
          res.status(400).send(error)
        } else {
          const newRequest = {
            body: {
              password: passw,
              document: clientSaved.document
            }
          }
          authClient(newRequest, res)
        }
      })
    }
  })
}


const getClient = (req, res) => {
  Clients.findById(req.params.id, PROJECTION, (error, client) => {
    if (error) {
      res.status(404).send(error)
    } else {
      res.send(client)
    }
  })
}



module.exports = { authClient, createClient, getClient, getClients, deleteClient }
