const express = require("express");
const Report = require("../controllers/report");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/report", [md_auth.ensureAuth], Report.getReport);
api.post("/add-report", [md_auth.ensureAuth], Report.addReport);

module.exports = api;