const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerTrashSchema = Schema({
    code: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    active: Boolean,
});

module.exports = mongoose.model("ContainerTrash", ContainerTrashSchema);