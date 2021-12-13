module.exports = (sequelize, Sequelize) => {
    const TypeT = sequelize.define("typeT", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return TypeT;
  };