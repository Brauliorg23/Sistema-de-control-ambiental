module.exports = (sequelize, Sequelize) => {
    const TypeReportC = sequelize.define("typeReportC", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return TypeReportC;
  };