const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const {API_VERSION} = require('./config');

// Load routings
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const ubicationRoutes = require("./routers/ubication");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// Configure Header HTTP
// ....



// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, ubicationRoutes);

module.exports = app;