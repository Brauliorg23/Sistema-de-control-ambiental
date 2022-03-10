const express = require("express");
const AreaControler = require("../controllers/area");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-area", [md_auth.ensureAuth], AreaControler.addArea);
api.get("/areas", [md_auth.ensureAuth], AreaControler.getAreas);
api.get("/areas-active", [md_auth.ensureAuth], AreaControler.getAreasActive);
api.put("/put-area/:id", [md_auth.ensureAuth], AreaControler.updateArea);
api.put("/activate-area/:id", [md_auth.ensureAuth], AreaControler.activateArea);
api.delete("/delete-area/:id", [md_auth.ensureAuth], AreaControler.deleteArea);

module.exports = api;