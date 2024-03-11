const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
app.use(express.static('public'))

const gamePwd = require('./scripts/config.js');
const {Reunion} = require("./scripts/reunion");
const reunion = new Reunion();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('🔗 a user connected');
    socket.emit("ping", reunion);

    socket.on('raz', () => {
        console.log("🔥 RAZ partie");
        reunion.raz();
        io.emit("ping", reunion);
    });

    socket.on('start4', () => {
        console.log("🏁 partie 4 joueurs");
        reunion.start4();
        io.emit("ping", reunion);
    });

    socket.on('start5', () => {
        reunion.start5();
        console.log("🏁 partie 5 joueurs");
        io.emit("ping", reunion);
    });

    socket.on('fin', () => {
        reunion.fin();
        console.log("🏁 fin de partie");
        io.emit("ping", reunion);
    });

    socket.on('password', (password) => {
        if (password === gamePwd) {
            socket.emit("password");
            console.log("Authentification accordée à " + socket.id)
        } else {
            console.log("Authentification refusée à " + socket.id)
        }
    });

    socket.on('valider', (nombreJoueurs, contratVal, preneurVal, appelVal, boutVal, attaqueVal, chelemVal, pabVal) => {
        console.log("===============================================");
        console.log("Validation de la partie");
        console.log("===============================================");
        console.log("Nombre de joueurs: " + nombreJoueurs);
        console.log("Contrat: " + contratVal);
        console.log("Preneur: " + preneurVal);
        console.log("Appel: " + appelVal);
        console.log("Bout: " + boutVal);
        console.log("Attaque: " + attaqueVal);
        console.log("Chelem: " + chelemVal);
        console.log("Pab: " + pabVal);
        reunion.validerNouvellePartie(nombreJoueurs, contratVal, preneurVal, appelVal, boutVal, attaqueVal, chelemVal, pabVal);
        io.emit("ping", reunion);
    });

    socket.on('disconnect', () => {
        console.log('🔥 user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

