class DatasetScore {
    label = "";
    data = [];
    backgroundColor = "";
    fill = false;
    tension = 0.1;

    constructor(label, data, backgroundColor) {
        this.label = label;
        this.data = data;
        this.backgroundColor = backgroundColor;
    }
}

module.exports = {DatasetScore};