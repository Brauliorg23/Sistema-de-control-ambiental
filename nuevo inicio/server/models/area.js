const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = Schema({
    codigo: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    active: Boolean
});

module.exports = mongoose.model("Area", AreaSchema);