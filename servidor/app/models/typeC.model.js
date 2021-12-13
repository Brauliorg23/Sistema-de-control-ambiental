module.exports = (sequelize, Sequelize) => {
    const TypeC = sequelize.define("typeC", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return TypeC;
  };