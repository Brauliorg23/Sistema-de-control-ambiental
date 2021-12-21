const db = require("../models");
const TypeC = db.typeCs;
const Op = db.Sequelize.Op;

// Create and Save a new TypeC
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a TypeC
  const typeC = {
    title: req.body.title,
    description: req.body.description
  };

  // Save TypeC in the database
  TypeC.create(typeC)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TypeC."
      });
    });
};

// Retrieve all TypeC from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    TypeC.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving TypeC."
        });
      });
};

// Find a single TypeC with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TypeC.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find TypeC with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving TypeC with id=" + id
        });
      });
};

// Update a TypeC by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TypeC.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeC was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update TypeC with id=${id}. Maybe TypeC was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating TypeC with id=" + id
        });
      });
};

// Delete a TypeC with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TypeC.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeC was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete TypeC with id=${id}. Maybe TypeC was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TypeC with id=" + id
        });
      });
};

// Delete all TypeC from the database.
exports.deleteAll = (req, res) => {
    TypeC.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} TypeC were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all TypeC."
          });
        });
};

// Find all published TypeC
exports.findAllPublished = (req, res) => {
    TypeC.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeC."
      });
    });
};