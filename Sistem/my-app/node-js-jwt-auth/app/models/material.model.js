module.exports = (sequelize, Sequelize) => {
    const Material = sequelize.define("material", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Material;
  };