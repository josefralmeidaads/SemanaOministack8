const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://arrowgamer:arrowgamer@oministack.7qksd.mongodb.net/semana09?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true 
})

const connectedUsers = {};

io.on('connection', socket => { // ouvindo toda conexão aberta por usuários
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers;

    return next();
})

app.use(express.json())// falando para meu express interpretar arquivos de tipo JSON

app.use(cors()); // permitindo qualquer aplicação acessar minha API

app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads')))

app.use(routes)

server.listen('3333')