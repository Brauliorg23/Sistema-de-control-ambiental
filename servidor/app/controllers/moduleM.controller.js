const db = require("../models");
const ModuleM = db.moduleMs;
const Op = db.Sequelize.Op;

// Create and Save a new ModuleM
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ModuleM
  const moduleM = {
    title: req.body.title,
    description: req.body.description
  };

  // Save ModuleM in the database
  ModuleM.create(moduleM)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ModuleM."
      });
    });
};

// Retrieve all ModuleM from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ModuleM.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ModuleM."
        });
      });
};

// Find a single ModuleM with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ModuleM.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ModuleM with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ModuleM with id=" + id
        });
      });
};

// Update a ModuleM by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ModuleM.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ModuleM was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ModuleM with id=${id}. Maybe ModuleM was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ModuleM with id=" + id
        });
      });
};

// Delete a ModuleM with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ModuleM.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ModuleM was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ModuleM with id=${id}. Maybe ModuleM was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ModuleM with id=" + id
        });
      });
};

// Delete all ModuleM from the database.
exports.deleteAll = (req, res) => {
    ModuleM.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} ModuleM were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all ModuleM."
          });
        });
};

// Find all published ModuleM
exports.findAllPublished = (req, res) => {
    LocatModuleMion.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ModuleM."
      });
    });
};