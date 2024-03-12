const {Joueur} = require('./joueur');
const {Contrat} = require('./contrat');
const {Partie} = require('./partie');

const laurent = new Joueur(1, "Laurent", "laurent.jpg", false, 'rgb(45,82,211)');
const dan = new Joueur(2, "Dan", "dan.jpg", false, 'rgb(232,90,30)');
const etienne = new Joueur(3, "Etienne", "etienne.jpg", false, 'rgb(160,21,212)');
const jp = new Joueur(4, "Jp", "jp.jpg", false, 'rgb(77,232,35)');
const guest = new Joueur(5, "Guest", "guest.jpg", true, 'rgb(93,173,183)');
const baseJoueurs = [laurent, dan, etienne, jp, guest];

const belge = new Contrat(1, "Belge", "🇧🇪", 0);
const petite = new Contrat(2, "Petite", "P", 20);
const garde = new Contrat(3, "Garde", "G", 50);
const gardeSans = new Contrat(4, "Garde sans", "GS", 100);
const gardeContre = new Contrat(5, "Garde contre", "GC", 200);
const contrats = [belge, petite, garde, gardeSans, gardeContre];



class Reunion {
    status = 100;
    nombreJoueurs = 0;
    parties = [];
    joueurs = [];
    labels = [0];
    dataSetDan = [0];
    dataSetEtienne = [0];
    dataSetJp = [0];
    dataSetLaurent = [0];
    dataSetGuest = [0];

    constructor() {
        this.status = 100;
        this.nombreJoueurs = 0;
        this.parties = [];
        this.joueurs = [];
        this.labels = [];
        this.dataSetDan = [];
        this.dataSetEtienne = [];
        this.dataSetJp = [];
        this.dataSetLaurent = [];
        this.dataSetGuest = [];
    }

    getNombrePartie() {
        return this.parties.length;
    }

    reinitialiserJoueur() {
        baseJoueurs.forEach(joueur => joueur.reset());
    }

    getJoueur(id) {
        return this.joueurs.find(joueur => joueur.id === id);
    }

    getContrat(id) {
        return contrats.find(contrat => contrat.id === id);
    }

    raz() {
        this.status = 100;
        this.nombreJoueurs = 0;
        this.parties.length = 0;
        this.joueurs.length = 0;
        this.labels.length = 0;
        this.dataSetDan.length = 0;
        this.dataSetEtienne.length = 0;
        this.dataSetJp.length = 0;
        this.dataSetLaurent.length = 0;
        this.dataSetGuest.length = 0;
        this.reinitialiserJoueur();
        this.sortJoueursByPointsAndName();
    }

    start4() {
        this.status = 200;
        this.nombreJoueurs = 4;
        this.joueurs = [laurent, dan, etienne, jp];
        this.initialiseDebut()
        this.sortJoueursByPointsAndName();
    }

    start5() {
        this.status = 200;
        this.nombreJoueurs = 5;
        this.joueurs = [laurent, dan, etienne, jp, guest];
        this.initialiseDebut();
        this.sortJoueursByPointsAndName();
    }

    fin() {
        this.status = 300;
        this.sortJoueursByPointsAndName();
    }

    initialiseDebut(){
        this.labels = [0];
        this.dataSetDan = [0];
        this.dataSetEtienne = [0];
        this.dataSetJp = [0];
        this.dataSetLaurent = [0];
        this.dataSetGuest = [0];
    }

    validerNouvellePartie(nombreJoueurs, contratVal, preneurVal, appelVal, boutVal, attaqueVal, chelemVal, pabVal) {
        let nombrePartie = this.getNombrePartie() + 1;
        let contrat = this.getContrat(parseInt(contratVal));
        let initiale = contrat.initiale;
        let preneur = "";
        if (parseInt(preneurVal) !== -1) {
            let joueur = this.getJoueur(parseInt(preneurVal));
            preneur = joueur.getImage();
        }
        let appel = "";
        if (parseInt(appelVal) === 0) {
            appelVal = -1;
        }
        if (parseInt(appelVal) !== -1) {
            let joueur = this.getJoueur(parseInt(appelVal));
            if (preneurVal !== appelVal) {
                appel = joueur.getImage();
            } else {
                appel = "autogoal.jpg";
            }
        }
        let reussi = verifReussi(parseInt(boutVal), parseInt(attaqueVal));
        let points = verifDifference(parseInt(boutVal), parseInt(attaqueVal));
        let pab = "";
        if (parseInt(pabVal) !== -1) {
            let joueur = this.getJoueur(parseInt(pabVal));
            pab = joueur.getImage();
        }

        calculPoints(
            nombreJoueurs,
            parseInt(contratVal),
            parseInt(preneurVal),
            parseInt(appelVal),
            reussi,
            points,
            chelemVal,
            parseInt(pabVal),
            this.joueurs
        );
        createGraph(this.joueurs, nombrePartie, this.labels, this.dataSetDan, this.dataSetEtienne, this.dataSetJp, this.dataSetLaurent, this.dataSetGuest);
        let partie = new Partie(nombrePartie, contratVal, initiale, preneurVal, preneur, appelVal, appel, reussi, points, chelemVal, pabVal, pab);
        console.log("👷 Traitement pour ajout nouvelle partie");
        console.log("===============================================");
        console.log("Numero de la partie: " + partie.numero);
        console.log("Id du contrat: " + partie.idContrat);
        console.log("Initiale du contrat: " + partie.initiale);
        console.log("Chelem: " + partie.chelem);
        console.log("Id du preneur: " + partie.idPreneur);
        console.log("Image du preneur: " + partie.preneur);
        console.log("Id de l'appel: " + partie.idAppel);
        console.log("Image de l'appel: " + partie.appel);
        console.log("Fait: " + partie.reussi);
        console.log("Points: " + partie.points);
        console.log("Id Petit au bout: " + partie.idPetitAuBout);
        console.log("Image Petit au bout: " + partie.petitAuBout);
        console.log("===============================================");
        this.parties.push(partie);
        this.sortJoueursByPointsAndName();
    }

    sortJoueursByPointsAndName() {
        this.joueurs.sort((a, b) => {
            if (a.points === b.points) {
                return a.nom.localeCompare(b.nom);
            } else {
                return a.points - b.points;
            }
        });
    }
}


function verifReussi(bout, points) {
    let result = false;
    let minimum = 56;
    if (bout === 1) {
        minimum = 51;
    } else if (bout === 2) {
        minimum = 41;
    } else if (bout === 3) {
        minimum = 36;
    }

    let difference = points - minimum;
    if (difference >= 0) {
        result = true;
    }

    return result;

}

function verifDifference(bouts, points) {
    let minimum = 56;
    if (bouts === 1) {
        minimum = 51;
    } else if (bouts === 2) {
        minimum = 41;
    } else if (bouts === 3) {
        minimum = 36;
    }

    let difference = points - minimum;
    let surplus = Math.abs(difference);

    let arrondi = 0;
    if (surplus >= 5 && surplus < 14.5) {
        arrondi = 10;
    }
    if (surplus >= 15 && surplus < 24.5) {
        arrondi = 20;
    }
    if (surplus >= 25 && surplus < 34.5) {
        arrondi = 30;
    }
    if (surplus >= 35 && surplus < 44.5) {
        arrondi = 40;
    }
    if (surplus >= 45 && surplus < 54.5) {
        arrondi = 50;
    }

    return arrondi;
}

function getContrat(contratId) {
    return contrats.find(contrat => contrat.id === contratId);
}

function calculPoints(nombreDeJoueur, contratId, preneurId, appelId, reussi, points, chelem, pabId, joueurs){
    function methode4joueurs(contratId, preneurId, reussi, points, chelem, pabId) {
        let pointsTotal = getContrat(contratId).points + points;
        if (!reussi) {
            pointsTotal = -pointsTotal;
        }
        if(chelem){
            pointsTotal = pointsTotal * 2;
        }

        for(let joueur of joueurs){
            let actuel = joueur.points;
            let variation = 0;
            if(joueur.id === preneurId){
                variation = pointsTotal * 3;
            } else {
                variation = -pointsTotal;
            }
            if(pabId !== -1){
                if(joueur.id === pabId){
                    variation += 30;
                }else {
                    variation -= 10;
                }
            }
            joueur.setPoints(actuel + variation);
        }
    }

    function methode5joueurs(contratId, preneurId, appelId, reussi, points, chelem, pabId) {
        let pointsTotal = getContrat(contratId).points + points;
        if (!reussi) {
            pointsTotal = -pointsTotal;
        }
        if(chelem){
            pointsTotal = pointsTotal * 2;
        }

        for(let joueur of joueurs){
            let actuel = joueur.points;
            let variation = 0;
            if(joueur.id === preneurId){
                variation = pointsTotal * 2;
            } else if(joueur.id === appelId){
                variation = pointsTotal;
            } else {
                variation = -pointsTotal;
            }
            if(pabId !== -1){
                if(joueur.id === pabId){
                    variation += 40;
                }else {
                    variation -= 10;
                }
            }
            joueur.setPoints(actuel + variation);
        }
    }

    if(contratId > 1){
        if (nombreDeJoueur === 4) {
            methode4joueurs(contratId, preneurId, reussi, points, chelem, pabId);
        } else {
            methode5joueurs(contratId, preneurId, appelId, reussi, points, chelem, pabId);
        }
    }
}

function createGraph(joueurs, nombrePartie, labels, dataSetDan, dataSetEtienne, dataSetJp, dataSetLaurent, dataSetGuest) {
    labels.push(nombrePartie);
    for(const joueur of joueurs){
        if(joueur.id === 1){
            dataSetLaurent.push(joueur.points);
        }
        if(joueur.id === 2){
            dataSetDan.push(joueur.points);
        }
        if(joueur.id === 3){
            dataSetEtienne.push(joueur.points);
        }
        if(joueur.id === 4){
            dataSetJp.push(joueur.points);
        }
        if(joueur.id === 5){
            dataSetGuest.push(joueur.points);
        }
    }

}


module.exports = {Reunion};