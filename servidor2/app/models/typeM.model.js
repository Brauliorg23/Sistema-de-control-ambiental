module.exports = (sequelize, Sequelize) => {
    const TypeM = sequelize.define("typeM", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return TypeM;
  };