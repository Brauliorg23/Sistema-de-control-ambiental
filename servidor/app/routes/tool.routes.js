module.exports = app => {
    const tools = require("../controllers/tool.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tools
    router.post("/", tools.create);
  
    // Retrieve all tools
    router.get("/", tools.findAll);
  
    // Retrieve all published tools
    router.get("/published", tools.findAllPublished);
  
    // Retrieve a single tool with id
    router.get("/:id", tools.findOne);
  
    // Update a Loaction with id
    router.put("/:id", tools.update);
  
    // Delete a tool with id
    router.delete("/:id", tools.delete);
  
    // Delete all tools
    router.delete("/", tools.deleteAll);
  
    app.use('/api/tools', router);
  };