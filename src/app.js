require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');

const PORT = process.env.PORT || 3030;
const routes = require('./routes/index');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api/v1', routes(router));
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the Population management system!',
}));

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
  });
}

module.exports = app;
