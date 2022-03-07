const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Module = mongoose.model('Module');
const User = mongoose.model('User');

const ReportSchema = Schema({
    codigo: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    date: String,
    photo: String,
    conten1: String,
    conten2: String,
    conten3: String,
    conten4: String,
    conten5: String,
    conten6: String,
    conten7: String,
    conten8: String,
    conten9: String,
    conten10: String,
    module: {type: Schema.ObjectId, ref: "Module"},
    user: {type: Schema.ObjectId, ref: "User"}
});
module.exports = mongoose.model("Report", ReportSchema);