const db = require("../models");
const ModuleC = db.moduleCs;
const Op = db.Sequelize.Op;

// Create and Save a new ModuleC
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ModuleC
  const moduleC = {
    title: req.body.title,
    description: req.body.description
  };

  // Save ModuleC in the database
  ModuleC.create(moduleC)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ModuleC."
      });
    });
};

// Retrieve all ModuleC from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ModuleC.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving moduleCs."
        });
      });
};

// Find a single ModuleC with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ModuleC.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ModuleC with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ModuleC with id=" + id
        });
      });
};

// Update a ModuleC by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ModuleC.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ModuleC was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ModuleC with id=${id}. Maybe ModuleC was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ModuleC with id=" + id
        });
      });
};

// Delete a ModuleC with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    afterAll.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ModuleC was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ModuleC with id=${id}. Maybe ModuleC was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ModuleC with id=" + id
        });
      });
};

// Delete all ModuleC from the database.
exports.deleteAll = (req, res) => {
    ModuleC.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} ModuleC were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all ModuleC."
          });
        });
};

// Find all published ModuleC
exports.findAllPublished = (req, res) => {
    ModuleC.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ModuleC."
      });
    });
};