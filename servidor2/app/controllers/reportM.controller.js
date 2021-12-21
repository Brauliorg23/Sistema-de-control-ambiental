const db = require("../models");
const ReportM = db.reportMs;
const Op = db.Sequelize.Op;

// Create and Save a new ReportM
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ReportM
  const reportM = {
    title: req.body.title,
    description: req.body.description
  };

  // Save ReportM in the database
  ReportM.create(reportM)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ReportM."
      });
    });
};

// Retrieve all ReportM from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ReportM.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReportM."
        });
      });
};

// Find a single ReportM with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ReportM.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ReportM with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ReportM with id=" + id
        });
      });
};

// Update a ReportM by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ReportM.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ReportM was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ReportM with id=${id}. Maybe ReportM was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ReportM with id=" + id
        });
      });
};

// Delete a ReportM with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ReportM.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ReportM was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ReportM with id=${id}. Maybe ReportM was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ReportM with id=" + id
        });
      });
};

// Delete all ReportM from the database.
exports.deleteAll = (req, res) => {
    ReportM.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} ReportM were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all ReportM."
          });
        });
};

// Find all published ReportM
exports.findAllPublished = (req, res) => {
    ReportM.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ReportM."
      });
    });
};