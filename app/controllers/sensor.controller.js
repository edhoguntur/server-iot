const db = require('../models');
const sensor = db.sensors;
const arduino = db.arduinos;
const Op = db.sequelize.Op;

exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    sensor.findAll({ where: condition, order : ['iotTimestamp','DESC'] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sensors data."
            });
        });
};

exports.insert = async (req, res) => {
    const clientApiKey = req.get('x-api-key');
    const clientArduinoId = await arduino.findOne({where: {apiKey: clientApiKey}});

    // insertSensorData
    const reqData = {
        pH: req.body.pH,
        waterTemperature: req.body.waterTemperature,
        airTemperature: req.body.airTemperature,
        tds: req.body.tds,
        iotTimestamp: req.body.iotTimestamp,
        arduinoId: clientArduinoId.id
    };

    // Save Tutorial in the database
    sensor.create(reqData)
        .then(data => {
            res.send(data);
            console.log(`new sensor data is inserted!`)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the new sensor data."
            });
        });
};