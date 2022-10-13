const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var location = require("./db");

const port = 8000;
const app = express();

//set up body parsers
app.use(bodyParser.json());

//Extend url parser urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

