module.exports = app => {
    const tipoContenedores = require("../controllers/tipoContenedor.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tipoContenedores
    router.post("/", tipoContenedores.create);
  
    // Retrieve all tipoContenedores
    router.get("/", tipoContenedores.findAll);
  
    // Retrieve all published tipoContenedores
    router.get("/published", tipoContenedores.findAllPublished);
  
    // Retrieve a single tipoContenedores with id
    router.get("/:id", tipoContenedores.findOne);
  
    // Update a Loaction with id
    router.put("/:id", tipoContenedores.update);
  
    // Delete a tipoContenedores with id
    router.delete("/:id", tipoContenedores.delete);
  
    // Delete all tipoContenedores
    router.delete("/", tipoContenedores.deleteAll);
  
    app.use('/api/tipoContenedores', router);
  };