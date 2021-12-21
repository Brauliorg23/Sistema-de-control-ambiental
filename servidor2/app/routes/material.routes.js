module.exports = app => {
    const materials = require("../controllers/material.controller.js");
  
    var router = require("express").Router();
  
    // Create a new materials
    router.post("/", materials.create);

    // Retrieve all materials
    router.get("/", materials.findAll);
  
    // Retrieve all published materials
    router.get("/published", materials.findAllPublished);
  
    // Retrieve a single material with id
    router.get("/:id", materials.findOne);
  
    // Update a Loaction with id
    router.put("/:id", materials.update);
  
    // Delete a material with id
    router.delete("/:id", materials.delete);
  
    // Delete all materials
    router.delete("/", materials.deleteAll);
  
    app.use('/api/materials', router);
  };