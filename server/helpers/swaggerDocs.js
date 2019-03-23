const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Super Heros',
      description: 'CRUD up and play with your favourite MARVEL and DC SuperHeros',
    },
    basePath: '/',
  },
  
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['endpoints.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
