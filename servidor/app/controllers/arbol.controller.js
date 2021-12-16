const Arbol = require("../models/arbol.model.js");

// Create and Save a new Arbol
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Arbol
  const arbol = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save Arbol in the database
  Arbol.create(arbol, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the arbol."
      });
    else res.send(data);
  });
};

// Retrieve all arbol from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Arbol.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving arbol."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
    Arbol.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving arbol."
        });
      else res.send(data);
    });
  };

// Find a single arbol with an id
exports.findOne = (req, res) => {
    Arbol.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found arbol with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving arbol with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a arbol by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Arbol.updateById(
    req.params.id,
    new Arbol(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found arbol with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating arbol with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a arbol with the specified id in the request
exports.delete = (req, res) => {
    Arbol.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found arbol with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete arbol with id " + req.params.id
        });
      }
    } else res.send({ message: `arbol was deleted successfully!` });
  });
};

// Delete all arbol from the database.
exports.deleteAll = (req, res) => {
    Arbol.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All arbol were deleted successfully!` });
  });
};

