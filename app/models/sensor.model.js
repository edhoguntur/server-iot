module.exports = (sequelize, Sequelize) => {
    const sensor = sequelize.define("sensor", {
        pH: {
            type: Sequelize.DOUBLE
        },
        waterTemperature: {
            type: Sequelize.INTEGER
        },
        airTemperature: {
            type: Sequelize.DOUBLE
        },
        tds: {
            type: Sequelize.INTEGER
        },
        iotTimestamp : {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });
    return sensor;
};