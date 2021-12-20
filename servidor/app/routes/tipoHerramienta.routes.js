module.exports = app => {
    const tipoHerramientas = require("../controllers/tipoHerramienta.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tipoHerramientas
    router.post("/", tipoHerramientas.create);
  
    // Retrieve all tipoHerramientas
    router.get("/", tipoHerramientas.findAll);
  
    // Retrieve all published tipoHerramientas
    router.get("/published", tipoHerramientas.findAllPublished);
  
    // Retrieve a single tipoHerramientas with id
    router.get("/:id", tipoHerramientas.findOne);
  
    // Update a Loaction with id
    router.put("/:id", tipoHerramientas.update);
  
    // Delete a tipoHerramientas with id
    router.delete("/:id", tipoHerramientas.delete);
  
    // Delete all tipoHerramientas
    router.delete("/", tipoHerramientas.deleteAll);
  
    app.use('/api/tipoHerramientas', router);
  };