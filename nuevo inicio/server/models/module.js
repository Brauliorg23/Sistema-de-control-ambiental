const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContainerTrash = mongoose.model('ContainerTrash');
const Ubication = mongoose.model('Ubication');

const ModuleSchema = Schema({
    codigo: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    active: Boolean,
    condition: Boolean,
    conten1: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten2: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten3: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten4: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten5: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten6: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten7: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten8: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten9: {type: Schema.ObjectId, ref: "ContainerTrash"},
    conten10: {type: Schema.ObjectId, ref: "ContainerTrash"},
    ubication: {type: Schema.ObjectId, ref: "Ubication"}
});

module.exports = mongoose.model("Module", ModuleSchema);