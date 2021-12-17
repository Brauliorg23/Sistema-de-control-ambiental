const Area = require("../models/area.model.js");

// Create and Save a new area
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a area
  const area = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  };

  // Save area in the database
  Area.create(area, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the area."
      });
    else res.send(data);
  });
};

// Retrieve all area from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Area.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving areas."
        });
      else res.send(data);
    });
  };
  
exports.findAllPublished = (req, res) => {
  Area.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving areas."
        });
      else res.send(data);
    });
  };

// Find a single area with an id
exports.findOne = (req, res) => {
  Area.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found area with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving area with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};




// Update a area by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Area.updateById(
    req.params.id,
    new Area(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found area with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating area with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a area with the specified id in the request
exports.delete = (req, res) => {
  Area.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found area with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete area with id " + req.params.id
        });
      }
    } else res.send({ message: `area was deleted successfully!` });
  });
};

// Delete all areas from the database.
exports.deleteAll = (req, res) => {
  Area.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loactions."
      });
    else res.send({ message: `All areas were deleted successfully!` });
  });
};

