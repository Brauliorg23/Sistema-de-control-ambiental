module.exports = app => {
    const tipoReporteMateriales = require("../controllers/tipoReporteMaterial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tipoReporteMateriales
    router.post("/", tipoReporteMateriales.create);
  
    // Retrieve all tipoReporteMateriales
    router.get("/", tipoReporteMateriales.findAll);
  
    // Retrieve all published tipoReporteMateriales
    router.get("/published", tipoReporteMateriales.findAllPublished);
  
    // Retrieve a single tipoReporteMateriales with id
    router.get("/:id", tipoReporteMateriales.findOne);
  
    // Update a tipoReporteMateriales with id
    router.put("/:id", tipoReporteMateriales.update);
  
    // Delete a tipoReporteMateriales with id
    router.delete("/:id", tipoReporteMateriales.delete);
  
    // Delete all tipoReporteMateriales
    router.delete("/", tipoReporteMateriales.deleteAll);
  
    app.use('/api/tipoReporteMateriales', router);
  };