module.exports = (sequelize, Sequelize) => {
    const Container = sequelize.define("container", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });

    
  
    return Container;
  };