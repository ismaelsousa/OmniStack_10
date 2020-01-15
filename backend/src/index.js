const express = require("express")
const mongoose = require("mongoose")

const routes = require('./routes')
mongoose.connect('mongodb+srv://ismael:senha@nodecluster-imcru.mongodb.net/week10?retryWrites=true&w=majority',{ 
  useUnifiedTopology: true,
  useNewUrlParser: true 
})
const app = express() 
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT||3333, ()=>{console.log('serving')})