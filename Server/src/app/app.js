const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/text', require('../routers/prompt_router'));

app.use('/stream', require('../routers/stream_router'));

module.exports = app;