const TipoMaterial = require("../models/tipoMaterial.model.js");

// Create and Save a new tipoMaterial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a tipoMaterial
  const tipoMaterial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save tipoMaterial in the database
  TipoMaterial.create(tipoMaterial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tipoMaterial."
      });
    else res.send(data);
  });
};

// Retrieve all tipoMateriales from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    TipoMaterial.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoMateriales."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
  TipoMaterial.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoMateriales."
        });
      else res.send(data);
    });
  };

// Find a single tipoMaterial with an id
exports.findOne = (req, res) => {
  TipoMaterial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoMaterial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tipoMaterial with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a tipoMaterial by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TipoMaterial.updateById(
    req.params.id,
    new TipoMaterial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found tipoMaterial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating tipoMaterial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a tipoMaterial with the specified id in the request
exports.delete = (req, res) => {
  TipoMaterial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoMaterial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete tipoMaterial with id " + req.params.id
        });
      }
    } else res.send({ message: `tipoMaterial was deleted successfully!` });
  });
};

// Delete all tipoMateriales from the database.
exports.deleteAll = (req, res) => {
  TipoMaterial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All tipoMateriales were deleted successfully!` });
  });
};

