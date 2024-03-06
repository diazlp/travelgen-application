import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  stripBasePath: false,
  swagger: {
    info: {
      title: 'TravelGen API Endpoint',
      description: 'TravelGen Fastify Backend Server',
      version: '1.0.0',
      // termsOfService: 'https://mywebsite.io/tos',
      contact: {
        name: 'Diaz Linggaputra',
        url: 'https://diazlinggaputra.vercel.app/',
        email: 'diazlinggaputra@gmail.com',
      },
    },
    externalDocs: {
      url: 'https://github.com/diazlp',
      description: 'See Diaz other code',
    },
    host: '127.0.0.1:4009',
    basePath: '',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: 'Health',
        description: 'Application Health Checker',
      },
      {
        name: 'Auth',
        description: 'Authentication API',
      },
      {
        name: 'Package',
        description: 'Application Package API',
      },
      {
        name: 'Category',
        description: 'Application Category API',
      },
      {
        name: 'Testimony',
        description: 'Application Testimony API',
      },
      {
        name: 'Transaction',
        description: 'User Transaction API',
      },
    ],
    definitions: {
      // User: {
      //   type: 'object',
      //   required: ['id', 'email'],
      //   properties: {
      //     id: {
      //       type: 'number',
      //       format: 'uuid',
      //     },
      //     firstName: {
      //       type: 'string',
      //     },
      //     lastName: {
      //       type: 'string',
      //     },
      //     email: {
      //       type: 'string',
      //       format: 'email',
      //     },
      //   },
      // },
    },
    securityDefinitions: {
      ApiToken: {
        description: 'Authorization header token, sample: "#TOKEN"',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      // Oauth2Token: {
      //   description: 'OAUTH2',
      //   type: 'oauth2',
      //   flow: 'accessCode',
      //   authorizationUrl: 'https://example.com/oauth/authorize',
      //   tokenUrl: 'https://example.com/oauth/token',
      //   scopes: {
      //     read: 'Grants read access',
      //     foo: 'Grants foao scope',
      //   },
      // },
    },
  },
};

export const swaggerUIOptions: FastifySwaggerUiOptions = {
  routePrefix: '/api',
  uiConfig: {
    docExpansion: 'list', // expand/not all the documentations none|list|full
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  theme: {
    title: 'TravelGen API Swagger',
  },
  staticCSP: false,
  transformStaticCSP: (header) => header,
  // exposeRoute: false,
};
