module.exports = app => {
    const containers = require("../controllers/container.controller.js");
  
    var router = require("express").Router();
  
    // Create a new containers
    router.post("/", containers.create);
  
    // Retrieve all containers
    router.get("/", containers.findAll);
  
    // Retrieve all published containers
    router.get("/published", containers.findAllPublished);
  
    // Retrieve a single container with id
    router.get("/:id", containers.findOne);
  
    // Update a Loaction with id
    router.put("/:id", containers.update);
  
    // Delete a container with id
    router.delete("/:id", containers.delete);
  
    // Delete all containers
    router.delete("/", containers.deleteAll);
  
    app.use('/api/containers', router);
  };