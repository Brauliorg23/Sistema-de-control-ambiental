module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Location;
  };