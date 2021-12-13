module.exports = (sequelize, Sequelize) => {
    const TypeReportM = sequelize.define("typeReportM", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return TypeReportM;
  };