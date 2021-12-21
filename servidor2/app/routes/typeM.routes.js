module.exports = app => {
    const typeMs = require("../controllers/typeM.controller.js");
  
    var router = require("express").Router();
  
    // Create a new typeMs
    router.post("/", typeMs.create);
  
    // Retrieve all typeMs
    router.get("/", typeMs.findAll);
  
    // Retrieve all published typeMs
    router.get("/published", typeMs.findAllPublished);
  
    // Retrieve a single typeMs with id
    router.get("/:id", typeMs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", typeMs.update);
  
    // Delete a typeMs with id
    router.delete("/:id", typeMs.delete);
  
    // Delete all typeMs
    router.delete("/", typeMs.deleteAll);
  
    app.use('/api/typeMs', router);
  };