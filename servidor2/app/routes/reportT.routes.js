module.exports = app => {
    const reportTs = require("../controllers/reportT.controller.js");
  
    var router = require("express").Router();
  
    // Create a new reportTs
    router.post("/", reportTs.create);
  
    // Retrieve all reportTs
    router.get("/", reportTs.findAll);
  
    // Retrieve all published reportTs
    router.get("/published", reportTs.findAllPublished);
  
    // Retrieve a single reportTs with id
    router.get("/:id", reportTs.findOne);
  
    // Update a Loaction with id
    router.put("/:id", reportTs.update);
  
    // Delete a reportTs with id
    router.delete("/:id", reportTs.delete);
  
    // Delete all reportTs
    router.delete("/", reportTs.deleteAll);
  
    app.use('/api/reportTs', router);
  };