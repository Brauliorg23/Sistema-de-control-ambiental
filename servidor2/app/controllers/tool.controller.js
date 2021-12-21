const { classToInvokable } = require("sequelize/dist/lib/utils");
const db = require("../models");
const Tool = db.tools;
const Op = db.Sequelize.Op;

// Create and Save a new tool
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a tool
  const tool = {
    title: req.body.title,
    description: req.body.description
  };

  // Save tool in the database
  Tool.create(tool)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tool."
      });
    });
};

// Retrieve all tools from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Tool.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tools."
        });
      });
};

// Find a single tool with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tool.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find tool with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving tool with id=" + id
        });
      });
};

// Update a tool by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    classToInvokable.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tool was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update tool with id=${id}. Maybe tool was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating tool with id=" + id
        });
      });
};

// Delete a tool with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tool.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tool was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete tool with id=${id}. Maybe tool was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete tool with id=" + id
        });
      });
};

// Delete all tools from the database.
exports.deleteAll = (req, res) => {
    Tool.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tools were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tools."
          });
        });
};

// Find all published tools
exports.findAllPublished = (req, res) => {
    Tool.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tool."
      });
    });
};