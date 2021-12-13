const db = require("../models");
const Container = db.containers;
const Op = db.Sequelize.Op;

// Create and Save a new container
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a container
  const container = {
    title: req.body.title,
    description: req.body.description
  };

  // Save container in the database
  Container.create(container)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the container."
      });
    });
};

// Retrieve all containers from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Container.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving containers."
        });
      });
};

// Find a single container with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Container.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find container with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving container with id=" + id
        });
      });
};

// Update a container by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Container.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Conatiner was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update container with id=${id}. Maybe container was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating contairner with id=" + id
        });
      });
};

// Delete a container with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Container.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Container was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete container with id=${id}. Maybe container was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete container with id=" + id
        });
      });
};

// Delete all containers from the database.
exports.deleteAll = (req, res) => {
    Container.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Containers were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all containers."
          });
        });
};

// Find all published containers
exports.findAllPublished = (req, res) => {
    Container.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving container."
      });
    });
};