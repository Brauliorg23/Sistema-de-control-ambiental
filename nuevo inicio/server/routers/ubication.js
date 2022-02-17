const express = require("express");
const UbicationController = require("../controllers/ubication");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-ubication", UbicationController.addUbication );
api.get("/get-ubications", UbicationController.getUbications);
api.put("/put-ubication/:id", UbicationController.updateUbication);
api.put("/activate-ubication/:id", UbicationController.activateUbication);
api.delete("/delete-ubication/:id", UbicationController.deleteUbication);



module.exports = api;