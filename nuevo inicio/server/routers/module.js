const express = require("express");
const Module = require("../controllers/module");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/module", Module.getModule);
api.post("/add-module", Module.addModule);

module.exports = api;