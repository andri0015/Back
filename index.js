const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { PORT } = require('./config')

// Carga y abre la conexión con la base de datos
require('./db')

// Rutas
const client = require('./routers/clients')
const accounts = require('./routers/accounts')
const transactions = require('./routers/transactions')

// Middleware para permitir recibir solicitudes HTTP desde cualquier dominio
app.use(cors())

// Middleware para leer datos en JSON desde el body de la petición
app.use(bodyParser.json())

// Instalación de rutas en el router principa
app.use(express.json());
app.use('/api/clients/', client)
app.use('/api/accounts/', accounts)
app.use('/api/transactions/', transactions)
app.use('/covers', express.static('covers'))

app.listen(PORT, () => {
  console.log(`Server APP listening at localhost:${PORT}`)
})
