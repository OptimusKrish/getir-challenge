const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc');
const { ValidationError } = require('express-validation');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes/index');
const getir = require('./routes/getir');

const app = express();
app.use(bodyParser.json());

// To define Swagger API - Docs
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Getir-Challenge Rest API',
    description: 'Rest API to fetch data from Mongo DB',
    version: '1.0.0',
  },
  servers: [
    {
      url: process.env.baseUrl,
      description: 'API server',
    }
  ],
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Rest API Routes
app.use('/', routes);
app.use('/v1', getir);

// catch 404
app.use(function(req, res, next) {
  return res.status(404).json({ status: '404', message: 'Invalid Route'});
});

// catch 500 and other uncaught errors
app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
});

module.exports = app;
