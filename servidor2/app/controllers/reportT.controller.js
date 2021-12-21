const db = require("../models");
const ReportT = db.reportTs;
const Op = db.Sequelize.Op;

// Create and Save a new ReportT
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ReportT
  const reportT = {
    title: req.body.title,
    description: req.body.description
  };

  // Save ReportT in the database
  ReportT.create(reportT)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ReportT."
      });
    });
};

// Retrieve all ReportT from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ReportT.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ReportT."
        });
      });
};

// Find a single ReportT with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ReportT.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ReportT with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ReportT with id=" + id
        });
      });
};

// Update a ReportT by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ReportT.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ReportT was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ReportT with id=${id}. Maybe ReportT was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ReportT with id=" + id
        });
      });
};

// Delete a ReportT with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ReportT.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ReportT was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ReportT with id=${id}. Maybe ReportT was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ReportT with id=" + id
        });
      });
};

// Delete all ReportT from the database.
exports.deleteAll = (req, res) => {
    ReportT.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} ReportT were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all ReportT."
          });
        });
};

// Find all published ReportT
exports.findAllPublished = (req, res) => {
    ReportT.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ReportT."
      });
    });
};