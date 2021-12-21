const db = require("../models");
const TypeReportC = db.typeReportCs;
const Op = db.Sequelize.Op;

// Create and Save a new TypeReportC
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a TypeReportC
  const typeReportC= {
    title: req.body.title,
    description: req.body.description
  };

  // Save TypeReportC in the database
  TypeReportC.create(typeReportC)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TypeReportC."
      });
    });
};

// Retrieve all TypeReportC from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    TypeReportC.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving TypeReportC."
        });
      });
};

// Find a single TypeReportC with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TypeReportC.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find TypeReportC with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving TypeReportC with id=" + id
        });
      });
};

// Update a TypeReportC by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TypeReportC.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeReportC was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update TypeReportC with id=${id}. Maybe TypeReportC was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating TypeReportC with id=" + id
        });
      });
};

// Delete a TypeReportC with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TypeReportC.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TypeReportC was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete TypeReportC with id=${id}. Maybe TypeReportC was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TypeReportC with id=" + id
        });
      });
};

// Delete all TypeReportC from the database.
exports.deleteAll = (req, res) => {
    TypeReportC.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} TypeReportC were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all TypeReportC."
          });
        });
};

// Find all published TypeReportC
exports.findAllPublished = (req, res) => {
    TypeReportC.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TypeReportC."
      });
    });
};