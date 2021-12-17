const TipoReporteMaterial = require("../models/tipoReporteMaterial.model.js");

// Create and Save a new tipoReporteMaterial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a tipoReporteMaterial
  const tipoReporteMaterial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save tipoReporteMaterial in the database
  TipoReporteMaterial.create(tipoReporteMaterial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tipoReporteMaterial."
      });
    else res.send(data);
  });
};

// Retrieve all tipoReporteMateriales from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    TipoReporteMaterial.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoReporteMateriales."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
  TipoReporteMaterial.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tipoReporteMateriales."
        });
      else res.send(data);
    });
  };

// Find a single tipoReporteMaterial with an id
exports.findOne = (req, res) => {
  TipoReporteMaterial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoReporteMaterial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tipoReporteMaterial with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a tipoReporteMaterial by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TipoReporteMaterial.updateById(
    req.params.id,
    new TipoReporteMaterial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found tipoReporteMaterial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating tipoReporteMaterial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a tipoReporteMaterial with the specified id in the request
exports.delete = (req, res) => {
  TipoReporteMaterial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tipoReporteMaterial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete tipoReporteMaterial with id " + req.params.id
        });
      }
    } else res.send({ message: `tipoReporteMaterial was deleted successfully!` });
  });
};

// Delete all tipoReporteMateriales from the database.
exports.deleteAll = (req, res) => {
  TipoReporteMaterial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All tipoReporteMateriales were deleted successfully!` });
  });
};

