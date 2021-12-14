module.exports = app => {
    const moduleCs = require("../controllers/moduleC.controller.js");
  
    var router = require("express").Router();
  
    // Create a new moduleCs
    router.post("/", moduleCs.create);
  
    // Retrieve all moduleCs
    router.get("/", moduleCs.findAll);
  
    // Retrieve all published moduleCs
    router.get("/published", moduleCs.findAllPublished);
  
    // Retrieve a single moduleCs with id
    router.get("/:id", moduleCs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", moduleCs.update);
  
    // Delete a moduleCs with id
    router.delete("/:id", moduleCs.delete);
  
    // Delete all moduleCs
    router.delete("/", moduleCs.deleteAll);
  
    app.use('/api/moduleCs', router);
  };