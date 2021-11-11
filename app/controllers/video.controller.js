const db = require("../models");
const Video = db.videos;
const Op = db.Sequelize.Op;

// Create and Save a new Video
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Video
  const video = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Video in the database
  Video.create(video)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Video."
      });
    });
};

// Retrieve all Videos from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Video.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Videos."
      });
    });
};

// Find a single Video with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Video.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Video with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Video with id=" + id
      });
    });
};

// Update a Video by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Video.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Video was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Video with id=${id}. Maybe Video was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Video with id=" + id
      });
    });
};

// Delete a Video with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Video.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Video was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Video with id=${id}. Maybe Video was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Video with id=" + id
      });
    });
};

// Delete all Videos from the database.
exports.deleteAll = (req, res) => {
  Video.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Videos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Videos."
      });
    });
};

// find all published Video
exports.findAllPublished = (req, res) => {
  Video.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Videos."
      });
    });
};
