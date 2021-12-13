module.exports = (sequelize, Sequelize) => {
    const TypeReportT = sequelize.define("typeReportT", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return TypeReportT;
  };