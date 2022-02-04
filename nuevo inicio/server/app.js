const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const {API_VERSION} = require('./config');

// Load routings
const userRoues = require('./routers/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// Configure Header HTTP
// ....



// Router Basic
app.use(`/api/${(API_VERSION)}`, userRoues);


module.exports = app;