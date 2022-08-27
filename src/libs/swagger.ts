import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';
import { configuration } from '../config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MTA HOSTING OPTIMIZER',
      version: '1.0.0',
    },
    host: `${configuration.host}:${configuration.port}`,
    servers: [
      {
        url: '/api',
      },
    ],
  },
  apis: ['src/routes/*.ts'],
};


export const getSwaggerUI = () => {
  const openapiSpecification = swaggerJsdoc(options);
  return {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(openapiSpecification),
  };
};
