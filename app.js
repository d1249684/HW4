const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/index', apiRouter);

module.exports = app;
