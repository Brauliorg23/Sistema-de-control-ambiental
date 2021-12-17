const TipoContenedor = require("../models/tipoContenedor.model.js");

// Create and Save a new tipoContenedor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a tipoContenedor
  const tipoContenedor = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save tipoContenedor in the database
  TipoContenedor.create(tipoContenedor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tipoContenedor."
      });
    else res.send(data);
  });
};

// Retrieve all tipoContenedores from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    TipoContenedor.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoContenedores."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
  TipoContenedor.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoContenedores."
        });
      else res.send(data);
    });
  };

// Find a single tipoContenedor with an id
exports.findOne = (req, res) => {
  TipoContenedor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoContenedor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tipoContenedor with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a tipoContenedor by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TipoContenedor.updateById(
    req.params.id,
    new TipoContenedor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found tipoContenedor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating tipoContenedor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a tipoContenedor with the specified id in the request
exports.delete = (req, res) => {
  TipoContenedor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoContenedor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete tipoContenedor with id " + req.params.id
        });
      }
    } else res.send({ message: `tipoContenedor was deleted successfully!` });
  });
};

// Delete all tipoContenedores from the database.
exports.deleteAll = (req, res) => {
  TipoContenedor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All tipoContenedores were deleted successfully!` });
  });
};

