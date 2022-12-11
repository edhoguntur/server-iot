const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

// set up the db configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Init database
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// this line we will create the tables and association.
// ARDUINO & ASSOCIATION
db.arduinos = require('./arduino.model')(sequelize, Sequelize);
db.sensors = require('./sensor.model')(sequelize, Sequelize);

db.arduinos.hasMany(db.sensors, { as: "sensors"});
db.sensors.belongsTo(db.arduinos, {
    foreignKey: "arduinoId",
    as: "arduino"
});

module.exports = db;
