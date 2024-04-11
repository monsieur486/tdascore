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
    console.log("🔗 un nouvau client s'est connecté !");
    socket.emit("ping", reunion);

    socket.on('raz', () => {
        console.log("🔥 RAZ partie !!!");
        reunion.raz();
        io.emit("ping", reunion);
    });

    socket.on('start4', () => {
        console.log("🏁 création d'une nouvelle partie à 4 joueurs");
        reunion.start4();
        io.emit("ping", reunion);
    });

    socket.on('start5', () => {
        console.log("🏁 création d'une nouvelle partie à 5 joueurs");
        reunion.start5();
        io.emit("ping", reunion);
    });

    socket.on('fin', () => {
        console.log("🏁 fin de partie");
        reunion.fin();
        io.emit("ping", reunion);
    });

    socket.on('ctrlz', () => {
        console.log("CTRL-Z");
        reunion.ctrlz();
        io.emit("ping", reunion);
    });

    socket.on('password', (password) => {
        if (password === gamePwd) {
            socket.emit("password");
            console.log("🔓 Authentification accordée à " + socket.id)
        } else {
            console.log("🔓 Authentification refusée à " + socket.id)
        }
    });

    socket.on('valider', (nombreJoueurs, contratVal, preneurVal, appelVal, boutVal, attaqueVal, chelemVal, pabVal) => {
        console.log("🛜 recpetion d'informations pour nouvelle partie");
        console.log("===============================================");
        console.log("Nombre de joueurs: " + nombreJoueurs);
        console.log("Id du contrat: " + contratVal);
        console.log("Id du preneur: " + preneurVal);
        console.log("Id de l'appel: " + appelVal);
        console.log("Nombre de bouts: " + boutVal);
        console.log("Points du preneur: " + attaqueVal);
        console.log("Chelem: " + chelemVal);
        console.log("Id Petit au bout: " + pabVal);
        reunion.validerNouvellePartie(nombreJoueurs, contratVal, preneurVal, appelVal, boutVal, attaqueVal, chelemVal, pabVal);
        io.emit("ping", reunion);
    });

    socket.on('disconnect', () => {
        console.log("🔥 un utilisateur c'est déconnecté !");
    });
});

server.listen(3000, () => {
    console.log('🖥️ Serveur lancé en écoute sur le port *:3000');
});

