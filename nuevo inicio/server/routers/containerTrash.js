const express = require("express");
const ContainerTrash = require("../controllers/containerTrash");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-container", ContainerTrash.addContainerTrash);
api.get("/get-container", ContainerTrash.getContainerTrash);
api.put("/put-container/:id", ContainerTrash.updateContainerTrash);
api.put("/activate-container/:id", ContainerTrash.activateContainerTrash);
api.delete("/delete-container/:id", ContainerTrash.deleteContainerTrash);

module.exports = api;