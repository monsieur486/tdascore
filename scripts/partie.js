class Partie {

    numero = 0;
    idContrat = -1;
    initiale = "";
    idPreneur = -1;
    preneur = "";
    preneurImage = "";
    idAppel = -1;
    appel = "";
    appelImage = "";
    reussi = "";
    points = 0;
    chelemReussite = false;
    chelem = "";
    idPetitAuBout = -1;
    petitAuBout = "";
    petitAuBoutImage = "";

    constructor(numero, idContrat, initiale, idPreneur, preneur, preneurImage, idAppel, appel, appelImage, reussi, points, chelem, idPetitAuBout, petitAuBout, petitAuBoutImage) {
        this.numero = numero;
        this.idContrat = idContrat;
        this.initiale = initiale;
        this.idPreneur = idPreneur;
        this.preneur = preneur;
        this.preneurImage = preneurImage;
        this.idAppel = idAppel;
        this.appel = appel;
        this.appelImage = appelImage;
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
            this.petitAuBoutImage = petitAuBoutImage;
        }
    }

}

module.exports = {Partie};