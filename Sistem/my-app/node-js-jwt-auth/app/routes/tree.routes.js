module.exports = app => {
    const trees = require("../controllers/tree.controller.js");
  
    var router = require("express").Router();
  
    // Create a new trees
    router.post("/", trees.create);
  
    // Retrieve all trees
    router.get("/", trees.findAll);
  
    // Retrieve all published trees
    router.get("/published", trees.findAllPublished);
  
    // Retrieve a single tree with id
    router.get("/:id", trees.findOne);
  
    // Update a Loaction with id
    router.put("/:id", trees.update);
  
    // Delete a tree with id
    router.delete("/:id", trees.delete);
  
    // Delete all trees
    router.delete("/", trees.deleteAll);
  
    app.use('/api/trees', router);
  };