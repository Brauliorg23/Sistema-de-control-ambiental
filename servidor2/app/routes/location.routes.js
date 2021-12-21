module.exports = app => {
    const locations = require("../controllers/location.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Locations
    router.post("/", locations.create);
  
    // Retrieve all Locations
    router.get("/", locations.findAll);
  
    // Retrieve all published Locations
    router.get("/published", locations.findAllPublished);
  
    // Retrieve a single Location with id
    router.get("/:id", locations.findOne);
  
    // Update a Loaction with id
    router.put("/:id", locations.update);
  
    // Delete a Location with id
    router.delete("/:id", locations.delete);
  
    // Delete all Locations
    router.delete("/", locations.deleteAll);
  
    app.use('/api/locations', router);
  };