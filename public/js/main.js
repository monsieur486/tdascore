const socket = io();

const connectform = document.getElementById("connectform");
const password = document.getElementById("pass");
const gameMaster = document.getElementById("gameMaster");
const sendBtn = document.getElementById("sendBtn");
const initGame = document.getElementById("initGame");
const partie4 = document.getElementById("partie4");
const partie5 = document.getElementById("partie5");
const scoreGame = document.getElementById("scoreGame");
const preneur4 = document.getElementById("preneur4");
const preneur5 = document.getElementById("preneur5");
const appel = document.getElementById("appel");
const contrat = document.getElementById("contrat");
const bout = document.getElementById("bout");
const attaque = document.getElementById("attaque");
const defense = document.getElementById("defense");
const chelem = document.getElementById("chelem");
const pab4 = document.getElementById("pab4");
const pab5 = document.getElementById("pab5");
const valider = document.getElementById("valider");
const raz = document.getElementById("raz");
const fin = document.getElementById("fin");
const erreurSrv = document.getElementById("erreurSrv");
const attente = document.getElementById("attente");
const joueursTab = document.getElementById("joueursTab");
const titreReunion = document.getElementById("titreReunion");
const graphscore = document.getElementById("graphscore");
const myChart = new Chart(document.getElementById('myChart').getContext('2d'), {type: 'line', data: {}});
const tableauParties = document.getElementById("tableauParties");

let isAuthtificated = false;
let status = 0;
let nombreJoueurs = 0;
let parties = [];
let joueurs = [];
let attaquePts = 91;
let defensePts = 0;
let labels = [];
let dataSetsDan = [];
let dataSetsEtienne = [];
let dataSetsJp = [];
let dataSetsLaurent = [];
let dataSetsGuest = [];

function renderPage() {
    attaque.value = attaquePts;
    defense.value = defensePts;

    if (isAuthtificated) {
        connectform.style.display = 'none';
        gameMaster.style.display = 'inline';
        if (status === 0) {
            scoreGame.style.display = 'none';
            initGame.style.display = 'none';
            raz.style.display = 'none';
            fin.style.display = 'none';
        }
        if (status === 100) {
            scoreGame.style.display = 'none';
            initGame.style.display = 'inline';
            raz.style.display = 'none';
            fin.style.display = 'none';
        }
        if (status === 200) {
            initGame.style.display = 'none';
            raz.style.display = 'none';
            fin.style.display = 'inline';
            scoreGame.style.display = 'inline';
        }
        if (status === 300) {
            initGame.style.display = 'none';
            raz.style.display = 'inline';
            fin.style.display = 'none';
            scoreGame.style.display = 'inline';
        }

        if (nombreJoueurs === 4) {
            preneur4.style.display = 'inline';
            preneur5.style.display = 'none';
            appel.style.display = 'none';
            pab4.style.display = 'inline';
            pab5.style.display = 'none';
        } else {
            preneur4.style.display = 'none';
            preneur5.style.display = 'inline';
            appel.style.display = 'inline';
            pab4.style.display = 'none';
            pab5.style.display = 'inline';
        }

    } else {
        gameMaster.style.display = 'none';
        connectform.style.display = 'inline';
    }

    if (status === 0) {
        attente.style.display = 'none';
        tableJoueurs.style.display = 'none';
        erreurSrv.style.display = 'inline';
    }

    if (status === 100) {
        tableJoueurs.style.display = 'none';
        erreurSrv.style.display = 'none';
        attente.style.display = 'inline';
    }

    if (status === 200) {
        erreurSrv.style.display = 'none';
        attente.style.display = 'none';
        tableJoueurs.style.display = 'inline';
        titreReunion.innerText = "Partie à " + nombreJoueurs + " joueurs";
    }

    if (status === 300) {
        erreurSrv.style.display = 'none';
        attente.style.display = 'none';
        tableJoueurs.style.display = 'inline';
        titreReunion.innerText = "Partie à " + nombreJoueurs + " joueurs";
    }

    let datasets4 = [
        {
            label: 'Dan',
            data: dataSetsDan,
            fill: false,
            borderColor: 'rgb(232,90,30)',
            tension: 0.1
        },
        {
            label: 'Etienne',
            data: dataSetsEtienne,
            fill: false,
            borderColor: 'rgb(160,21,212)',
            tension: 0.1
        },
        {
            label: 'JP',
            data: dataSetsJp,
            fill: false,
            borderColor: 'rgb(77,232,35)',
            tension: 0.1
        },
        {
            label: 'Laurent',
            data: dataSetsLaurent,
            fill: false,
            borderColor: 'rgb(45,82,211)',
            tension: 0.1
        }
    ]
    let datasets5 = [
        {
            label: 'Dan',
            data: dataSetsDan,
            fill: false,
            borderColor: 'rgb(232,90,30)',
            tension: 0.1
        },
        {
            label: 'Etienne',
            data: dataSetsEtienne,
            fill: false,
            borderColor: 'rgb(160,21,212)',
            tension: 0.1
        },
        {
            label: 'Guest',
            data: dataSetsGuest,
            fill: false,
            borderColor: 'rgb(77,232,35)',
            tension: 0.1
        },
        {
            label: 'JP',
            data: dataSetsJp,
            fill: false,
            borderColor: 'rgb(45,82,211)',
            tension: 0.1
        },
        {
            label: 'Laurent',
            data: dataSetsLaurent,
            fill: false,
            borderColor: 'rgb(93,173,183)',
            tension: 0.1
        }
    ]

    if (status >= 200) {
        if (nombreJoueurs === 4) {
            renderChart(labels, datasets4);
        } else {
            renderChart(labels, datasets5);
        }

    } else {
        renderChart([], []);
    }

    // render score
    joueursTab.innerHTML = "";
    for (i = 0; i < joueurs.length; ++i) {
        let tr = document.createElement('tr');
        let tdNom = document.createElement('td');
        let tdPoints = document.createElement('td');
        let tdDette = document.createElement('td');
        tdNom.innerText = joueurs[i].nom;
        tdPoints.innerText = joueurs[i].points;
        if(joueurs[i].points<0) {
            tdPoints.classList.add('text-danger');
        }
        tdDette.innerText = joueurs[i].dette;
        tr.appendChild(tdNom);
        tr.appendChild(tdPoints);
        if(status === 300) {
            tr.appendChild(tdDette);
        } else {
            tdDette.style.display = 'x';
        }
        joueursTab.appendChild(tr);
    }


    // rednder table
    tableauParties.innerHTML = "";
    for (i = 0; i < parties.length; ++i) {
        let li = document.createElement('li');
        let messagePartie = "";
        messagePartie = li.innerText = parties[i].numero + " ";
        if(parties[i].idContrat > 1) {
            messagePartie += parties[i].initiale
                + " "
                + parties[i].preneur;

                if(nombreJoueurs === 5) {
                    messagePartie += "-"
                        + parties[i].appel;
                }
            messagePartie +=" "
                + parties[i].reussi
                + " "
                + parties[i].points;
            if(parties[i].chelemReussite === true) {
                messagePartie += " " + parties[i].chelem;
            }
            if(parties[i].idPetitAuBout >= 1) {
                messagePartie += " 1️⃣: "
                    + parties[i].petitAuBout;
            }
        } else {
            messagePartie += "🇧🇪 Belge";
        }

        li.innerText = messagePartie;

        tableauParties.appendChild(li);
    }

    console.log("🖥️ Mise à jour de la page terminée");


}

function renderChart(labels, dataset) {

    myChart.data = {
        labels: labels,
        datasets: dataset
    };
    myChart.update();

}

function sendPassword() {
    if (password.value) {
        socket.emit("password", password.value);
        password.value = "";
    }
}

sendBtn.addEventListener("click", sendPassword);

function startPartie4() {
    socket.emit("start4");
}

partie4.addEventListener("click", startPartie4);

function startPartie5() {
    socket.emit("start5");
}

partie5.addEventListener("click", startPartie5);

function finPartie() {
    socket.emit("fin");
}

fin.addEventListener("click", finPartie);

function razPartie() {
    socket.emit("raz");
}

raz.addEventListener("click", razPartie);

function changeAttaque() {
    attaquePts = attaque.value;
    defensePts = 91 - attaquePts;
    defense.value = defensePts;
}

attaque.addEventListener("change", changeAttaque);

function changeDefense() {
    defensePts = defense.value;
    attaquePts = 91 - defensePts;
    attaque.value = attaquePts;
}

defense.addEventListener("change", changeDefense);

function reinitialiseform() {
    contrat.value = -1;
    preneur4.value = -1;
    preneur5.value = -1;
    appel.value = -1;
    bout.value = 0;
    attaque.value = 91;
    defense.value = 0;
    attaquePts = 91;
    defensePts = 0;
    chelem.checked = false;
    pab4.value = -1;
    pab5.value = -1;
}

function validerPartie() {
    let contratVal = contrat.value;
    let preneurVal = 0;
    let appelVal = 0;
    let pabVal = 0;
    if (nombreJoueurs === 4) {
        preneurVal = preneur4.value;
        pabVal = pab4.value;
        appelVal = -1;
    } else {
        preneurVal = preneur5.value;
        appelVal = appel.value;
        pabVal = pab5.value;
    }

    let boutVal = bout.value;
    let attaqueVal = attaque.value;
    let chelemVal = chelem.checked;

    if (contrat.value >= 1) {
        socket.emit("valider", nombreJoueurs, contratVal, preneurVal, appelVal, boutVal, attaqueVal, chelemVal, pabVal);
    }

    reinitialiseform();
}

valider.addEventListener("click", validerPartie);

socket.on("connect", (event) => {
    reinitialiseform();
    console.log("️️️️🖥️ Connecté au serveur avec id: " + socket.id);

    socket.on("ping", (reunion) => {
        status = reunion.status;
        nombreJoueurs = reunion.nombreJoueurs;
        joueurs = reunion.joueurs;
        parties = reunion.parties;
        labels = reunion.labels;
        dataSetsDan = reunion.dataSetDan;
        dataSetsEtienne = reunion.dataSetEtienne;
        dataSetsJp = reunion.dataSetJp;
        dataSetsLaurent = reunion.dataSetLaurent;
        dataSetsGuest = reunion.dataSetGuest;
        console.log("📡 Réception de données du serveur pour mise à jour de la page");
        console.log("📡 Statut de la réunion: " + status);
        console.log("📡 Nombre de joueurs: " + nombreJoueurs);
        console.log("📡 * Joueurs *");
        joueurs.forEach(joueur => {
            console.log("📡 Joueur: " + joueur.nom + " - " + joueur.points + " - " + joueur.dette);
        });
        console.log("📡 * Parties *");
        parties.forEach(partie => {
            console.log("📡 Partie: " + partie.numero + " - " + partie.initiale);
        });
        console.log("📡 Labels: " + labels);
        console.log("📡 DataSetsDan: " + dataSetsDan);
        console.log("📡 DataSetsEtienne: " + dataSetsEtienne);
        console.log("📡 DataSetsJp: " + dataSetsJp);
        console.log("📡 DataSetsLaurent: " + dataSetsLaurent);
        console.log("📡 DataSetsGuest: " + dataSetsGuest);
        console.log("📡 Mise à jour de la page en cours...");

        renderPage();
    });

    socket.on('password', () => {
        console.log("🔓 Authentifié avec succès !");
        isAuthtificated = true;
        renderPage();
    });
})