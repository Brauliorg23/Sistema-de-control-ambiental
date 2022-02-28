const express = require("express");
const ContainerTrash = require("../controllers/containerTrash");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-container",[md_auth.ensureAuth] , ContainerTrash.addContainerTrash);
api.get("/get-container", [md_auth.ensureAuth], ContainerTrash.getContainerTrash);
api.get("/containersTrash-active", [md_auth.ensureAuth], ContainerTrash.getContainersActive);
api.put("/put-container/:id", [md_auth.ensureAuth], ContainerTrash.updateContainerTrash);
api.put("/activate-container/:id", [md_auth.ensureAuth], ContainerTrash.activateContainerTrash);
api.delete("/delete-container/:id", [md_auth.ensureAuth], ContainerTrash.deleteContainerTrash);

module.exports = api;