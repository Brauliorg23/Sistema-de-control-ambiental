module.exports = (sequelize, Sequelize) => {
    const ModuleM = sequelize.define("moduleM", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return ModuleM;
  };