module.exports = (sequelize, Sequelize) => {
    const ModuleC = sequelize.define("moduleC", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return ModuleC;
  };