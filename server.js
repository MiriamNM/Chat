const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const router = require('./network/routes');
const socket = require('./socket');
const { config } = require('./config');

const db = require('./db');

db(`mongodb+srv://${config.db_user}:${config.db_password}@${config.db_host}/${config.db_name}?retryWrites=true&w=majority`);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

socket.connect(server);

router(app);

app.use('/app', express.static('public'))

server.listen(3000, function () {
    console.log('La aplicación escucha en http://localhost:3000');
});

