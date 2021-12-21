const db = require("../models");
const Area = db.areas;
const Op = db.Sequelize.Op;

// Create and Save a new area
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a area
  const area = {
    title: req.body.title,
    description: req.body.description
  };

  // Save area in the database
  Area.create(area)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the area."
      });
    });
};

// Retrieve all area from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Area.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving areas."
        });
      });
};

// Find a single area with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Area.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find area with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving area with id=" + id
        });
      });
};

// Update a area by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Area.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Area was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update area with id=${id}. Maybe area was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating area with id=" + id
        });
      });
};

// Delete a area with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    afterAll.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Area was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete area with id=${id}. Maybe area was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete area with id=" + id
        });
      });
};

// Delete all areas from the database.
exports.deleteAll = (req, res) => {
    Area.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Areas were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all areas."
          });
        });
};

// Find all published areas
exports.findAllPublished = (req, res) => {
    Area.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving area."
      });
    });
};