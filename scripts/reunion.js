const {Joueur} = require('./joueur');
const {Contrat} = require('./contrat');
const {Partie} = require('./partie');

const laurent = new Joueur(1, "Laurent", "laurent.jpg", false, 'rgb(45,82,211)');
const dan = new Joueur(2, "Dan", "dan.jpg", false, 'rgb(232,90,30)');
const etienne = new Joueur(3, "Etienne", "etienne.jpg", false, 'rgb(160,21,212)');
const jp = new Joueur(4, "Jp", "jp.jpg", false, 'rgb(77,232,35)');
const guest = new Joueur(5, "Guest", "guest.jpg", true, 'rgb(93,173,183)');

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
    labels = [];
    dataSetDan = [];
    dataSetEtienne = [];
    dataSetJp = [];
    dataSetLaurent = [];
    dataSetGuest = [];

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
        this.joueurs.forEach(joueur => joueur.reset());
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
        this.sortJoueursByPointsAndName();
    }

    start5() {
        this.status = 200;
        this.nombreJoueurs = 5;
        this.joueurs = [laurent, dan, etienne, jp, guest];
        this.sortJoueursByPointsAndName();
    }

    fin() {
        this.status = 300;
        this.sortJoueursByPointsAndName();
    }

    validerNouvellePartie(nombreJoueurs, contratVal, preneurVal, appelVal, boutVal, attaqueVal, chelemVal, pabVal) {
        console.log("===============================================");
        console.log("Validation nouvelle partie");
        console.log("===============================================");
        let nombrePartie = this.getNombrePartie() + 1;
        console.log("Numero de la partie: " + nombrePartie);
        let contrat = this.getContrat(parseInt(contratVal));
        let initiale = contrat.initiale;
        console.log("Contrat: " + initiale);
        let preneur = "";
        if (parseInt(preneurVal) !== -1) {
            let joueur = this.getJoueur(parseInt(preneurVal));
            preneur = joueur.getImage();
        }
        console.log("Preneur: " + preneur);
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
        console.log("Appel: " + appel);
        let pab = "";
        if (parseInt(pabVal) !== -1) {
            let joueur = this.getJoueur(parseInt(pabVal));
            pab = joueur.getImage();
        }
        console.log("Chelem: " + chelemVal);

        console.log("Pab: " + pab);
        let reussi = true;
        let points = 10;
        console.log("Reussi: " + reussi);
        let partie = new Partie(nombrePartie, contratVal, initiale, preneurVal, preneur, appelVal, appel, reussi, points, chelemVal, pabVal, pab);
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

module.exports = {Reunion};