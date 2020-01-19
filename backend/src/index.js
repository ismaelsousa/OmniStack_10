const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
/**
 * Extraíndo servidor
 */

const http = require('http')
const routes = require('./routes')
const {setupWebSocket} = require('./websocket')

const app = express() 
const server = http.Server(app)

/**
 * Chamando função para o server ouvi o socket
 */
setupWebSocket(server)

/***
 * Banco de dados
 */

mongoose.connect('mongodb+srv://ismael:senha@nodecluster-imcru.mongodb.net/week10?retryWrites=true&w=majority',{ 
  useUnifiedTopology: true,
  useNewUrlParser: true 
})

/**
 * Uses
 */

app.use(cors())
app.use(express.json())
app.use(routes)

/**
 * Start
 */

server.listen(process.env.PORT||3333, ()=>{console.log('serving')})