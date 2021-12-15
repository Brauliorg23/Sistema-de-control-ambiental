module.exports = app => {
    const ubicaciones = require("../controllers/ubicacion.controller.js");
  
    var router = require("express").Router();
  
    // Create a new ubicaciones
    router.post("/", ubicaciones.create);
  
    // Retrieve all ubicaciones
    router.get("/", ubicaciones.findAll);
  
    // Retrieve all published ubicaciones
    router.get("/published", ubicaciones.findAllPublished);
  
    // Retrieve a single ubicaciones with id
    router.get("/:id", ubicaciones.findOne);
  
    // Update a Loaction with id
    router.put("/:id", ubicaciones.update);
  
    // Delete a ubicacion with id
    router.delete("/:id", ubicaciones.delete);
  
    // Delete all ubicaciones
    router.delete("/", ubicaciones.deleteAll);
  
    app.use('/api/ubicaciones', router);
  };