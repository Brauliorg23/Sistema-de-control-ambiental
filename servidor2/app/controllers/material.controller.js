const db = require("../models");
const Material = db.materials;
const Op = db.Sequelize.Op;

// Create and Save a new material
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a material
  const material = {
    title: req.body.title,
    description: req.body.description
  };

  // Save material in the database
  Material.create(material)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the material."
      });
    });
};

// Retrieve all materials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Material.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving materials."
        });
      });
};

// Find a single material with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Material.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find material with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving material with id=" + id
        });
      });
};

// Update a material by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Material.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Material was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update material with id=${id}. Maybe material was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating material with id=" + id
        });
      });
};

// Delete a material with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Material.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Material was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete material with id=${id}. Maybe material was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete material with id=" + id
        });
      });
};

// Delete all materials from the database.
exports.deleteAll = (req, res) => {
    Material.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Material were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all material."
          });
        });
};

// Find all published materials
exports.findAllPublished = (req, res) => {
    Material.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving material."
      });
    });
};