const db = require("../models");
const TypeReportM = db.typeReportMs;
const Op = db.Sequelize.Op;

// Create and Save a new TypeReportM
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a TypeReportM
  const typeReportM = {
    title: req.body.title,
    description: req.body.description
  };

  // Save TypeReportM in the database
  TypeReportM.create(typeReportM)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TypeReportM."
      });
    });
};

// Retrieve all TypeReportM from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    TypeReportM.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving TypeReportM."
        });
      });
};

// Find a single TypeReportM with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TypeReportM.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find TypeReportM with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving TypeReportM with id=" + id
        });
      });
};

// Update a TypeReportM by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TypeReportM.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeReportM was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update TypeReportM with id=${id}. Maybe TypeReportM was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating TypeReportM with id=" + id
        });
      });
};

// Delete a TypeReportM with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TypeReportM.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeReportM was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete TypeReportM with id=${id}. Maybe TypeReportM was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TypeReportM with id=" + id
        });
      });
};

// Delete all TypeReportM from the database.
exports.deleteAll = (req, res) => {
    TypeReportM.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} TypeReportM were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all TypeReportM."
          });
        });
};

// Find all published TypeReportM
exports.findAllPublished = (req, res) => {
    TypeReportM.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeReportM."
      });
    });
};