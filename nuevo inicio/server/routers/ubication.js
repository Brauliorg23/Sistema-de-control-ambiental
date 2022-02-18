const express = require("express");
const UbicationController = require("../controllers/ubication");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-ubication", [md_auth.ensureAuth], UbicationController.addUbication );
api.get("/get-ubications", [md_auth.ensureAuth], UbicationController.getUbications);
api.put("/put-ubication/:id", [md_auth.ensureAuth], UbicationController.updateUbication);
api.put("/activate-ubication/:id", [md_auth.ensureAuth], UbicationController.activateUbication);
api.delete("/delete-ubication/:id", [md_auth.ensureAuth], UbicationController.deleteUbication);



module.exports = api;