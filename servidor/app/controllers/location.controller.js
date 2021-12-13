const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new location
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a location
  const location = {
    title: req.body.title,
    description: req.body.description
  };

  // Save location in the database
  Location.create(location)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location."
      });
    });
};

// Retrieve all locations from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Location.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations."
        });
      });
};

// Find a single location with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Location.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Location with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Location with id=" + id
        });
      });
};

// Update a location by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Location.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Location with id=" + id
        });
      });
};

// Delete a location with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Location.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Location with id=${id}. Maybe Location was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Location with id=" + id
        });
      });
};

// Delete all locations from the database.
exports.deleteAll = (req, res) => {
    Location.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Locations were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all locations."
          });
        });
};

// Find all published locations
exports.findAllPublished = (req, res) => {
    Location.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Location."
      });
    });
};