const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerTrashSchema = Schema({
    idContainerTrash: {
        type: Number,
        unique: true
    },
    color: String,
    description: String,
    active: String,
});

module.exports = mongoose.model("ContainerTrash", ContainerTrashSchema);