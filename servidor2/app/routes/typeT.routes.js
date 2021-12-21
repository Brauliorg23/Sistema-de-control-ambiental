module.exports = app => {
    const typeTs = require("../controllers/typeT.controller.js");
  
    var router = require("express").Router();
  
    // Create a new typeTs
    router.post("/", typeTs.create);
  
    // Retrieve all typeTs
    router.get("/", typeTs.findAll);
  
    // Retrieve all published typeTs
    router.get("/published", typeTs.findAllPublished);
  
    // Retrieve a single typeTs with id
    router.get("/:id", typeTs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", typeTs.update);
  
    // Delete a typeTs with id
    router.delete("/:id", typeTs.delete);
  
    // Delete all typeTs
    router.delete("/", typeTs.deleteAll);
  
    app.use('/api/typeTs', router);
  };