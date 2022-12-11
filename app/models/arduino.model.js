module.exports = (sequelize, Sequelize) => {
    const arduino = sequelize.define("arduino", {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      serial: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      apiKey:{
        type: Sequelize.STRING,
        unique: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  
    return arduino;
  };