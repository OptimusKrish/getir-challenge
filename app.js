const express = require('express');
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc');
const { ValidationError } = require('express-validation');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes/index');
const getir = require('./routes/getir');

const app = express();
app.use(bodyParser.json());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Getir-Challenge Rest API',
    description: 'Rest API to fetch data from Mongo DB',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Production server',
    },
  ],
};

const swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/', routes);
app.use('/v1', getir);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
});

module.exports = app;
