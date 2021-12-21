module.exports = (sequelize, Sequelize) => {
    const ReportC = sequelize.define("reportC", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return ReportC;
  };