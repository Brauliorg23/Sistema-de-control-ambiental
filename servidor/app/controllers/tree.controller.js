const db = require("../models");
const Tree = db.trees;
const Op = db.Sequelize.Op;

// Create and Save a new tree
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a tree
  const tree = {
    title: req.body.title,
    description: req.body.description
  };

  // Save tree in the database
  Tree.create(tree)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tree."
      });
    });
};

// Retrieve all tree from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Tree.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tree."
        });
      });
};

// Find a single tree with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tree.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find tree with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving tree with id=" + id
        });
      });
};

// Update a tree by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TrackEvent.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tree was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update tree with id=${id}. Maybe tree was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating tree with id=" + id
        });
      });
};

// Delete a tree with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tree.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tree was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete tree with id=${id}. Maybe tree was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete tree with id=" + id
        });
      });
};

// Delete all trees from the database.
exports.deleteAll = (req, res) => {
    Tree.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tree were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Trees."
          });
        });
};

// Find all published trees
exports.findAllPublished = (req, res) => {
    Tree.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tree."
      });
    });
};