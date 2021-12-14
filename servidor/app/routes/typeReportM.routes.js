module.exports = app => {
    const typeReportMs = require("../controllers/typeReportM.controller.js");
  
    var router = require("express").Router();
  
    // Create a new typeReportMs
    router.post("/", typeReportMs.create);
  
    // Retrieve all typeReportMs
    router.get("/", typeReportMs.findAll);
  
    // Retrieve all published typeReportMs
    router.get("/published", typeReportMs.findAllPublished);
  
    // Retrieve a single typeReportMs with id
    router.get("/:id", typeReportMs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", typeReportMs.update);
  
    // Delete a typeReportMs with id
    router.delete("/:id", typeReportMs.delete);
  
    // Delete all typeReportMs
    router.delete("/", typeReportMs.deleteAll);
  
    app.use('/api/typeReportMs', router);
  };