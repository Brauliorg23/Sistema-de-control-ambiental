module.exports = (sequelize, Sequelize) => {
    const Area = sequelize.define("area", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Area;
  };