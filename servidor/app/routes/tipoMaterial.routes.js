module.exports = app => {
    const tipoMateriales = require("../controllers/tipoMaterial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tipoMateriales
    router.post("/", tipoMateriales.create);
  
    // Retrieve all tipoMateriales
    router.get("/", tipoMateriales.findAll);
  
    // Retrieve all published tipoMateriales
    router.get("/published", tipoMateriales.findAllPublished);
  
    // Retrieve a single tipoMateriales with id
    router.get("/:id", tipoMateriales.findOne);
  
    // Update a tipoMateriales with id
    router.put("/:id", tipoMateriales.update);
  
    // Delete a tipoMateriales with id
    router.delete("/:id", tipoMateriales.delete);
  
    // Delete all tipoMateriales
    router.delete("/", tipoMateriales.deleteAll);
  
    app.use('/api/tipoMateriales', router);
  };