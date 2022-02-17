const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = Schema({
    idReport: {
        type: Number,
        unique: true
    },
    color: String,
    description: String,
    date: date,
    photo: String
});

module.exports = mongoose.model("Report", ReportSchema);