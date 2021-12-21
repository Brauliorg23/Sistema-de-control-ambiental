module.exports = (sequelize, Sequelize) => {
    const Tree = sequelize.define("tree", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Tree;
  };