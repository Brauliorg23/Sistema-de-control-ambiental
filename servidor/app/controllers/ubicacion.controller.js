const Ubicacion = require("../models/ubicacion.model.js");

// Create and Save a new ubicacion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ubicacion
  const ubicacion = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save ubicacion in the database
  Ubicacion.create(ubicacion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ubicacion."
      });
    else res.send(data);
  });
};

// Retrieve all ubicaciones from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Ubicacion.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ubicaciones."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
  Ubicacion.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ubicaciones."
        });
      else res.send(data);
    });
  };

// Find a single ubicacion with an id
exports.findOne = (req, res) => {
  Ubicacion.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ubicacion with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ubicacion with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a ubicacion by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Ubicacion.updateById(
    req.params.id,
    new Ubicacion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ubicacion with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ubicacion with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ubicacion with the specified id in the request
exports.delete = (req, res) => {
  Ubicacion.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ubicacion with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ubicacion with id " + req.params.id
        });
      }
    } else res.send({ message: `ubicacion was deleted successfully!` });
  });
};

// Delete all ubicaciones from the database.
exports.deleteAll = (req, res) => {
  Ubicacion.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All ubicaciones were deleted successfully!` });
  });
};

