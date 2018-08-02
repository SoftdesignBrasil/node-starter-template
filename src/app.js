const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const users = require('./routes/characters');
const app = express();
const morgan = require('morgan')
const dotEnv = require('dotenv')

dotEnv.config()
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(function (req, res, next) {
  res.contentType('application/json');
  next();
});
app.use('/api/v1/characters', users);

module.exports = app;
