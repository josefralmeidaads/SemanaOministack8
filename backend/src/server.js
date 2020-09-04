const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()

mongoose.connect('mongodb+srv://arrowgamer:arrowgamer@oministack.7qksd.mongodb.net/semana09?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true 
})

app.use(express.json())// falando para meu express interpretar arquivos de tipo JSON

app.use(routes)

app.listen('3333')