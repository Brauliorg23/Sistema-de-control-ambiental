const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UbicationSchema = Schema({
    idUbication: {
        type: Number,
        unique: true
    },
    title: String,
    description: String,
    active: Boolean
});

module.exports = mongoose.model("Ubication", UbicationSchema);