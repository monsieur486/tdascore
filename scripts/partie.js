class Partie {

    numero = 0;
    idContrat = -1;
    initiale = "";
    idPreneur = -1;
    preneur = "";
    idAppel = -1;
    appel = "";
    reussi = "";
    points = 0;
    chelemReussite = false;
    chelem = "";
    idPetitAuBout = -1;
    petitAuBout = "";

    constructor(numero, idContrat, initiale, idPreneur, preneur, idAppel, appel, reussi, points, chelem, idPetitAuBout, petitAuBout) {
        this.numero = numero;
        this.idContrat = idContrat;
        this.initiale = initiale;
        this.idPreneur = idPreneur;
        this.preneur = preneur;
        this.idAppel = idAppel;
        this.appel = appel;
        this.reussi = "❌";
        if (reussi) {
            this.reussi = "✅";
        }
        this.points = points;
        this.chelemReussite = chelem;
        this.chelem = "";
        if (chelem) {
            this.chelem = "🔥 CHELEM! 🏆";
        }
        this.idPetitAuBout = idPetitAuBout;
        this.petitAuBout = "";
        if (idPetitAuBout >= 1) {
            this.petitAuBout = petitAuBout;
        }
    }

}

module.exports = {Partie};