const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/arbol.routes.js")(app);
// // require("./app/routes/area.routes.js")(app);
// require("./app/routes/tipoContenedor.routes.js")(app);
// require("./app/routes/tipoHerramienta.routes.js")(app);
// require("./app/routes/tipoMaterial.routes.js")(app);
// require("./app/routes/tipoReporteContenedor.routes.js")(app);
// require("./app/routes/tipoReporteMaterial.routes.js")(app);
require("./app/routes/tipoUsuario.routes.js")(app);
require("./app/routes/ubicacion.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});