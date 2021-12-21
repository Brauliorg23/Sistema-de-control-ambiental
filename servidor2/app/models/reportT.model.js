module.exports = (sequelize, Sequelize) => {
    const ReportT = sequelize.define("reportT", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return ReportT;
  };