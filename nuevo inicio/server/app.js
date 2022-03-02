const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const {API_VERSION} = require('./config');

// Load routings
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const ubicationRoutes = require("./routers/ubication");
const containerTrashRoutes = require("./routers/containerTrash");
const moduleRoutes = require("./routers/module");
// const reportRoutes = require("./routers/report");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// Configure Header HTTP
// ....



// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, ubicationRoutes);
app.use(`/api/${API_VERSION}`, containerTrashRoutes);
app.use(`/api/${API_VERSION}`, moduleRoutes);
// app.use(`/api/${API_VERSION}`, reportRoutes);

module.exports = app;