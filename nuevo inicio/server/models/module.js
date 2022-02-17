const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModuleSchema = Schema({
    idModule: {
        type: Number,
        unique: true
    },
    color: String,
    description: String,
    active: String,
    condition: String
});

module.exports = mongoose.model("Module", ModuleSchema);