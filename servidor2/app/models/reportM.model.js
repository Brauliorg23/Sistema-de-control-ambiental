module.exports = (sequelize, Sequelize) => {
    const ReportM = sequelize.define("reportM", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return ReportM;
  };