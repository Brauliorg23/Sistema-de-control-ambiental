const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.areas = require("./area.model.js")(sequelize, Sequelize);
db.containers = require("./container.model.js")(sequelize, Sequelize);
db.materials = require("./material.model.js")(sequelize, Sequelize);
db.tools = require("./tool.model.js")(sequelize, Sequelize);
db.trees = require("./tree.model.js")(sequelize, Sequelize);
db.moduleCs = require("./moduleC.model.js")(sequelize, Sequelize);
db.moduleMs = require("./moduleM.model.js")(sequelize, Sequelize);
db.reportCs = require("./reportC.model.js")(sequelize, Sequelize);
db.reportMs = require("./reportM.model.js")(sequelize, Sequelize);
db.reportTs = require("./reportT.model.js")(sequelize, Sequelize);
db.typeCs = require("./typeC.model.js")(sequelize, Sequelize);
db.typeMs = require("./typeM.model.js")(sequelize, Sequelize);
db.typeTs = require("./typeT.model.js")(sequelize, Sequelize);
db.typeReportCs = require("./typeReportC.model.js")(sequelize, Sequelize);
db.typeReportMs = require("./typeReportM.model.js")(sequelize, Sequelize);
db.typeReportTs = require("./typeReportT.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator","colon"];

module.exports = db;