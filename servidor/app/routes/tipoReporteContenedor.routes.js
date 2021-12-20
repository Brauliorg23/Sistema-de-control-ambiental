module.exports = app => {
    const tipoReporteContenedores = require("../controllers/tipoReporteContenedor.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tipoReporteContenedores
    router.post("/", tipoReporteContenedores.create);
  
    // Retrieve all tipoReporteContenedores
    router.get("/", tipoReporteContenedores.findAll);
  
    // Retrieve all published tipoReporteContenedores
    router.get("/published", tipoReporteContenedores.findAllPublished);
  
    // Retrieve a single tipoReporteContenedores with id
    router.get("/:id", tipoReporteContenedores.findOne);
  
    // Update a Loaction with id
    router.put("/:id", tipoReporteContenedores.update);
  
    // Delete a tipoReporteContenedores with id
    router.delete("/:id", tipoReporteContenedores.delete);
  
    // Delete all tipoReporteContenedores
    router.delete("/", tipoReporteContenedores.deleteAll);
  
    app.use('/api/tipoReporteContenedores', router);
  };