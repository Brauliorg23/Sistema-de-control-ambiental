module.exports = app => {
    const reportMs = require("../controllers/reportM.controller.js");
  
    var router = require("express").Router();
  
    // Create a new reportMs
    router.post("/", reportMs.create);
  
    // Retrieve all reportMs
    router.get("/", reportMs.findAll);
  
    // Retrieve all published reportMs
    router.get("/published", reportMs.findAllPublished);
  
    // Retrieve a single reportMs with id
    router.get("/:id", reportMs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", reportMs.update);
  
    // Delete a reportMs with id
    router.delete("/:id", reportMs.delete);
  
    // Delete all reportMs
    router.delete("/", reportMs.deleteAll);
  
    app.use('/api/reportMs', router);
  };