module.exports = app => {
    const typeCs = require("../controllers/typeC.controller.js");
  
    var router = require("express").Router();
  
    // Create a new typeCs
    router.post("/", typeCs.create);
  
    // Retrieve all typeCs
    router.get("/", typeCs.findAll);
  
    // Retrieve all published typeCs
    router.get("/published", typeCs.findAllPublished);
  
    // Retrieve a single typeCs with id
    router.get("/:id", typeCs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", typeCs.update);
  
    // Delete a typeCs with id
    router.delete("/:id", typeCs.delete);
  
    // Delete all typeCs
    router.delete("/", typeCs.deleteAll);
  
    app.use('/api/typeCs', router);
  };