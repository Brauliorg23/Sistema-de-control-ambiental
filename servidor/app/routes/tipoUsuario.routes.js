module.exports = app => {
    const tipoUsuarios = require("../controllers/tipoUsuario.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tipoUsuarios
    router.post("/", tipoUsuarios.create);
  
    // Retrieve all tipoUsuarios
    router.get("/", tipoUsuarios.findAll);
  
    // Retrieve all published tipoUsuarios
    router.get("/published", tipoUsuarios.findAllPublished);
  
    // Retrieve a single tipoUsuarios with id
    router.get("/:id", tipoUsuarios.findOne);
  
    // Update a Loaction with id
    router.put("/:id", tipoUsuarios.update);
  
    // Delete a tipoUsuarios with id
    router.delete("/:id", tipoUsuarios.delete);
  
    // Delete all tipoUsuarios
    router.delete("/", tipoUsuarios.deleteAll);
  
    app.use('/api/tipoUsuarios', router);
  };