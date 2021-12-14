const db = require("../models");
const TypeM = db.typeMs;
const Op = db.Sequelize.Op;

// Create and Save a new TypeM
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a TypeM
  const typeM = {
    title: req.body.title,
    description: req.body.description
  };

  // Save TypeM in the database
  TypeM.create(typeM)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TypeM."
      });
    });
};

// Retrieve all TypeM from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    TypeM.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving TypeM."
        });
      });
};

// Find a single TypeM with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TypeM.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find TypeM with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving TypeM with id=" + id
        });
      });
};

// Update a TypeM by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TypeM.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeM was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update TypeM with id=${id}. Maybe TypeM was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating TypeM with id=" + id
        });
      });
};

// Delete a TypeM with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TypeM.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeM was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete TypeM with id=${id}. Maybe TypeM was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TypeM with id=" + id
        });
      });
};

// Delete all TypeM from the database.
exports.deleteAll = (req, res) => {
    TypeM.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} TypeM were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all TypeM."
          });
        });
};

// Find all published TypeM
exports.findAllPublished = (req, res) => {
    TypeM.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeM."
      });
    });
};