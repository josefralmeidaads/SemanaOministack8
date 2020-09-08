const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
const cors = require('cors');
const path = require('path')

mongoose.connect('mongodb+srv://arrowgamer:arrowgamer@oministack.7qksd.mongodb.net/semana09?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true 
})

app.use(express.json())// falando para meu express interpretar arquivos de tipo JSON

app.use(cors()); // permitindo qualquer aplicação acessar minha API

app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads')))

app.use(routes)

app.listen('3333')