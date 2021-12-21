module.exports = (sequelize, Sequelize) => {
  const Tool = sequelize.define("tool", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Tool;
};