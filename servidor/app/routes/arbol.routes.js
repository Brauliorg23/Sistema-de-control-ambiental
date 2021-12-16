module.exports = app => {
    const arboles = require("../controllers/arbol.controller.js");
  
    var router = require("express").Router();
  
    // Create a new arboles
    router.post("/", arboles.create);
  
    // Retrieve all arboles
    router.get("/", arboles.findAll);
  
    // Retrieve all published arboles
    router.get("/published", arboles.findAllPublished);
  
    // Retrieve a single arboles with id
    router.get("/:id", arboles.findOne);
  
    // Update a Loaction with id
    router.put("/:id", arboles.update);
  
    // Delete a arboles with id
    router.delete("/:id", arboles.delete);
  
    // Delete all arboles
    router.delete("/", arboles.deleteAll);
  
    app.use('/api/arboles', router);
  };