class Joueur {

    constructor(id, nom, image, estGuest, color) {
        this.id = id;
        this.nom = nom;
        this.image = image;
        this.points = 0;
        this.dette = "0.00 €";
        this.estGuest = estGuest;
        this.color = color;
    }

    reset() {
        this.points = 0;
        this.dette = "0.00 €";
    }

    setPoints(points) {
        this.points = points;
        if (this.estGuest) {
            this.dette = "";
        } else {
            if (points < -10) {
                this.dette = (2 + (-points / 300)).toFixed(1) + "0 €";
            } else {
                this.dette = "2.00 €";
            }
        }
    }

    getImage() {
        return this.image;
    }
}

module.exports = {Joueur};