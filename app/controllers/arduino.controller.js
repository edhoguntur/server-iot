const db = require('../models');
const arduino = db.arduinos;
const Op = db.sequelize.Op;

// generate api Key
const genAPIKey = () => {
    return [...Array(30)]
        .map( (e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

// Create and Save a new micro
exports.insert = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Arduino Name cannot be empty!"
    });
    return;
  }

  // Create a arduino
  const reqData = {
    name: req.body.name,
    serial: req.body.serial,
    brand: req.body.brand,
    apiKey: genAPIKey()
  };

  // Save Tutorial in the database
  arduino.create(reqData)
    .then(data => {
      res.send(data);
      console.log(`new arduino is inserted!`)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the arduino."
      });
    });    
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    arduino.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving arduinos."
        });
      });
  };

  exports.findByName = (req, res) => {
    const inName = req.params.name;

    arduino.findOne({where: inName})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find arduino with name=${inName}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Error retrieving arduino with name=" + inName
        });
      });
  };

