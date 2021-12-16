const TipoUsuario = require("../models/tipoUsuario.model.js");

// Create and Save a new tipoUsuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a tipoUsuario
  const tipoUsuario = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save tipoUsuario in the database
  TipoUsuario.create(tipoUsuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tipoUsuario."
      });
    else res.send(data);
  });
};

// Retrieve all tipoUsuarios from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    TipoUsuario.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoUsuarios."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
    TipoUsuario.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoUsuarios."
        });
      else res.send(data);
    });
  };

// Find a single tipoUsuario with an id
exports.findOne = (req, res) => {
    TipoUsuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoUsuario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tipoUsuario with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a tipoUsuario by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TipoUsuario.updateById(
    req.params.id,
    new TipoUsuario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found tipoUsuario with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating tipoUsuario with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a tipoUsuario with the specified id in the request
exports.delete = (req, res) => {
    TipoUsuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoUsuario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete tipoUsuario with id " + req.params.id
        });
      }
    } else res.send({ message: `tipoUsuario was deleted successfully!` });
  });
};

// Delete all tipoUsuarios from the database.
exports.deleteAll = (req, res) => {
    TipoUsuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All tipoUsuarios were deleted successfully!` });
  });
};

