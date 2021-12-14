const db = require("../models");
const ReportC = db.reportCs;
const Op = db.Sequelize.Op;

// Create and Save a new ReportC
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ReportC
  const reportC = {
    title: req.body.title,
    description: req.body.description
  };

  // Save ReportC in the database
  ReportC.create(reportC)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ReportC."
      });
    });
};

// Retrieve all ReportC from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ReportC.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReportC."
        });
      });
};

// Find a single ReportC with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ReportC.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ReportC with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ReportC with id=" + id
        });
      });
};

// Update a ReportC by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ReportC.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ReportC was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ReportC with id=${id}. Maybe ReportC was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ReportC with id=" + id
        });
      });
};

// Delete a ReportC with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ReportC.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ReportC was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ReportC with id=${id}. Maybe ReportC was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ReportC with id=" + id
        });
      });
};

// Delete all ReportC from the database.
exports.deleteAll = (req, res) => {
    ReportC.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} ReportC were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all ReportC."
          });
        });
};

// Find all published ReportC
exports.findAllPublished = (req, res) => {
    ReportC.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ReportC."
      });
    });
};