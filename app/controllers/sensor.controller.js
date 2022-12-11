const db = require('../models');
const sensor = db.sensors;
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