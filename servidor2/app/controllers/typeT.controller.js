const db = require("../models");
const TypeT = db.typeTs;
const Op = db.Sequelize.Op;

// Create and Save a new TypeT
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a TypeT
  const typeT = {
    title: req.body.title,
    description: req.body.description
  };

  // Save TypeT in the database
  TypeT.create(typeT)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TypeT."
      });
    });
};

// Retrieve all TypeT from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    TypeT.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving TypeT."
        });
      });
};

// Find a single TypeT with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TypeT.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find TypeT with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving TypeT with id=" + id
        });
      });
};

// Update a TypeT by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TypeT.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeT was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update TypeT with id=${id}. Maybe TypeT was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating TypeT with id=" + id
        });
      });
};

// Delete a TypeT with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TypeT.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeT was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete TypeT with id=${id}. Maybe TypeT was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TypeT with id=" + id
        });
      });
};

// Delete all TypeT from the database.
exports.deleteAll = (req, res) => {
    TypeT.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} TypeT were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all TypeT."
          });
        });
};

// Find all published TypeT
exports.findAllPublished = (req, res) => {
    TypeT.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeT."
      });
    });
};