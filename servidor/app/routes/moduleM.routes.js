module.exports = app => {
    const moduleMs = require("../controllers/moduleM.controller.js");
  
    var router = require("express").Router();
  
    // Create a new moduleMs
    router.post("/", moduleMs.create);
  
    // Retrieve all moduleMs
    router.get("/", moduleMs.findAll);
  
    // Retrieve all published moduleMs
    router.get("/published", moduleMs.findAllPublished);
  
    // Retrieve a single moduleMs with id
    router.get("/:id", moduleMs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", moduleMs.update);
  
    // Delete a moduleMs with id
    router.delete("/:id", moduleMs.delete);
  
    // Delete all moduleMs
    router.delete("/", moduleMs.deleteAll);
  
    app.use('/api/moduleMs', router);
  };