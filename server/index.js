'use strict';

var app = require('express')();
var config = require('config');
var swaggerTools = require('swagger-tools');
var YAML = require('yamljs');
var auth = require('./api/helpers/auth');
var swaggerConfig = YAML.load('./api/contract/swagger.yaml');
var mongodb = require('mongoose');

var port = config.get('api.listenPort');
mongodb.Promise = global.Promise;
mongodb.connect(config.get('mongoDbConnectUrl'), { useMongoClient: true });
mongodb.connection.on('error', (err) => {
  console.error(`MongoDB connection error, exit service! Error: ${err}`);
  process.exit(1);
});
mongodb.connection.on('disconnected', () => {
  console.error('Disconnected from MongoDB, exit service!');
  process.exit(2);
});

swaggerTools.initializeMiddleware(swaggerConfig, function (middleware) {
  // Serves the Swagger UI on /docs
  app.use(middleware.swaggerMetadata());

  app.use(
    middleware.swaggerSecurity({
      // manage token function in the 'auth' module
      Bearer: auth.verifyToken
    })
  );

  var routerConfig = {
    controllers: './api/controllers',
    useStubs: false
  };

  app.use(middleware.swaggerRouter(routerConfig));

  app.use(middleware.swaggerUi());

  app.listen(port, function () {
    console.log('Started server on port: ', port);
  });
});
