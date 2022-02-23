const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModuleSchema = Schema({
    codigo: {
        type: String,
        unique: true
    },
    color: String,
    description: String,
    active: String,
    condition: String
});

module.exports = mongoose.model("Module", ModuleSchema);