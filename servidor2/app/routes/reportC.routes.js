module.exports = app => {
    const reportCs = require("../controllers/reportC.controller.js");
  
    var router = require("express").Router();
  
    // Create a new reportCs
    router.post("/", reportCs.create);
  
    // Retrieve all reportCs
    router.get("/", reportCs.findAll);
  
    // Retrieve all published reportCs
    router.get("/published", reportCs.findAllPublished);
  
    // Retrieve a single reportCs with id
    router.get("/:id", reportCs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", reportCs.update);
  
    // Delete a reportCs with id
    router.delete("/:id", reportCs.delete);
  
    // Delete all reportCs
    router.delete("/", reportCs.deleteAll);
  
    app.use('/api/reportCs', router);
  };