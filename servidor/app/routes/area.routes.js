module.exports = app => {
    const areas = require("../controllers/area.controller.js");
  
    var router = require("express").Router();
  
    // Create a new areas
    router.post("/", areas.create);
  
    // Retrieve all areas
    router.get("/", areas.findAll);
  
    // Retrieve all published areas
    router.get("/published", areas.findAllPublished);
  
    // Retrieve a single area with id
    router.get("/:id", areas.findOne);
  
    // Update a Loaction with id
    router.put("/:id", areas.update);
  
    // Delete a area with id
    router.delete("/:id", areas.delete);
  
    // Delete all areas
    router.delete("/", areas.deleteAll);
  
    app.use('/api/areas', router);
  };