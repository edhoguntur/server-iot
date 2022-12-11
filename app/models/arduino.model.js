module.exports = (sequelize, Sequelize) => {
    const arduino = sequelize.define("arduino", {
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      serial: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      apiKey:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  
    return arduino;
  };