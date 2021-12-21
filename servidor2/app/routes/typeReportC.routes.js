module.exports = app => {
    const typeReportCs = require("../controllers/typeReportC.controller.js");
  
    var router = require("express").Router();
  
    // Create a new typeReportCs
    router.post("/", typeReportCs.create);
  
    // Retrieve all typeReportCs
    router.get("/", typeReportCs.findAll);
  
    // Retrieve all published typeReportCs
    router.get("/published", typeReportCs.findAllPublished);
  
    // Retrieve a single typeReportCs with id
    router.get("/:id", typeReportCs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", typeReportCs.update);
  
    // Delete a typeReportCs with id
    router.delete("/:id", typeReportCs.delete);
  
    // Delete all typeReportCs
    router.delete("/", typeReportCs.deleteAll);
  
    app.use('/api/typeReportCs', router);
  };