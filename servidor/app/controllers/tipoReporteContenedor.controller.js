const TipoReporteContenedor = require("../models/tipoReporteContenedor.model.js");

// Create and Save a new tipoReporteContenedor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a tipoReporteContenedor
  const tipoReporteContenedor = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save tipoReporteContenedor in the database
  TipoReporteContenedor.create(tipoReporteContenedor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tipoReporteContenedor."
      });
    else res.send(data);
  });
};

// Retrieve all tipoReporteContenedor from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    TipoReporteContenedor.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoReporteContenedores."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
  TipoReporteContenedor.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoReporteContenedores."
        });
      else res.send(data);
    });
  };

// Find a single tipoReporteContenedor with an id
exports.findOne = (req, res) => {
  TipoReporteContenedor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoReporteContenedor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tipoReporteContenedor with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a tipoReporteContenedor by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TipoReporteContenedor.updateById(
    req.params.id,
    new TipoReporteContenedor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found tipoReporteContenedor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating tipoReporteContenedor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a tipoReporteContenedor with the specified id in the request
exports.delete = (req, res) => {
  TipoReporteContenedor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoReporteContenedor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete tipoReporteContenedor with id " + req.params.id
        });
      }
    } else res.send({ message: `tipoReporteContenedor was deleted successfully!` });
  });
};

// Delete all tipoReporteContenedores from the database.
exports.deleteAll = (req, res) => {
  TipoReporteContenedor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All tipoReporteContenedores were deleted successfully!` });
  });
};

