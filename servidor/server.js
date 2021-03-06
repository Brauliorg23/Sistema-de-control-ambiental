const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const db = require("./app/models");
const Role = db.role;


db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/location.routes')(app);
require('./app/routes/area.routes')(app);
require('./app/routes/container.routes')(app);
require('./app/routes/material.routes')(app);
require('./app/routes/tool.routes')(app);
require('./app/routes/tree.routes')(app);
require('./app/routes/moduleC.routes')(app);
require('./app/routes/moduleM.routes')(app);
require('./app/routes/reportC.routes')(app);
require('./app/routes/reportM.routes')(app);
require('./app/routes/reportT.routes')(app);
require('./app/routes/typeC.routes')(app);
require('./app/routes/typeM.routes')(app);
require('./app/routes/typeT.routes')(app);
require('./app/routes/typeReportC.routes')(app);
require('./app/routes/typeReportM.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
      id: 1,
      name: "Chequeo de residuos"
    });
   
    Role.create({
      id: 2,
      name: "Chequeo de inventario"
    });
   
    Role.create({
      id: 3,
      name: "chequeo de reserva"
    });
    Role.create({
      id: 4,
      name: "administrador de inventario"
    });
    Role.create({
      id: 5,
      name: "administrador de reserva"
    });
    Role.create({
      id: 6,
      name: "administrador de residuos"
    });
    Role.create({
      id: 7,
      name: "administrador global"
    });
  }