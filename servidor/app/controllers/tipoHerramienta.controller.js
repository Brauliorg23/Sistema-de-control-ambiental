const TipoHerramienta = require("../models/tipoHerramienta.model.js");

// Create and Save a new tipoHerramienta
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a tipoHerramienta
  const tipoHerramienta = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save tipoHerramienta in the database
  TipoHerramienta.create(tipoHerramienta, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tipoHerramienta."
      });
    else res.send(data);
  });
};

// Retrieve all tipoHerramienta from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    TipoHerramienta.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoHerramientas."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
  TipoHerramienta.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoHerramientas."
        });
      else res.send(data);
    });
  };

// Find a single tipoHerramienta with an id
exports.findOne = (req, res) => {
  TipoHerramienta.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoHerramienta with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tipoHerramienta with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a tipoHerramienta by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TipoHerramienta.updateById(
    req.params.id,
    new TipoHerramienta(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found tipoHerramienta with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating tipoHerramienta with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a tipoHerramienta with the specified id in the request
exports.delete = (req, res) => {
  TipoHerramienta.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoHerramienta with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete tipoHerramienta with id " + req.params.id
        });
      }
    } else res.send({ message: `tipoHerramienta was deleted successfully!` });
  });
};

// Delete all tipoHerramientas from the database.
exports.deleteAll = (req, res) => {
  TipoHerramienta.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All tipoHerramientas were deleted successfully!` });
  });
};

