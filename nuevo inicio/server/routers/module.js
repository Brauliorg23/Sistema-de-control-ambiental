const express = require("express");
const Module = require("../controllers/module");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/module", [md_auth.ensureAuth], Module.getModule);
api.post("/add-module", [md_auth.ensureAuth], Module.addModule);
api.put("/put-module/:id", [md_auth.ensureAuth], Module.updateModule);
api.put("/activate-module/:id", [md_auth.ensureAuth], Module.activateModule);
api.delete("/delete-module/:id", [md_auth.ensureAuth], Module.deleteModule);

module.exports = api;