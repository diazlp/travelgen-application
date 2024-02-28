import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { swaggerOptions, swaggerUIOptions } from '../lib/swagger/options';
import fastifyBcrypt from 'fastify-bcrypt';

import { authRoutes } from './routes/auth.routes';
import fastifyJwt from '@fastify/jwt';

const app: FastifyInstance = fastify({
  logger: false,
});

app.register(cors, { origin: '*' });
app.register(fastifyBcrypt, {
  saltWorkFactor: 10,
});
app.register(fastifyJwt, {
  secret: process.env.SECRET_KEY,
});

/*Swagger Documentation*/
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUIOptions);

app.addHook('onRequest', (request, _, done) => {
  console.log('masuk sini dulu say');

  done();
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};
app.register(
  (_, __, done) => {
    app.get('/v1.0/health', opts, async (_, reply) => {
      reply.send({ message: 'Health checked.' });
    });

    done();
  },
  { prefix: 'v1.0' },
);

app.register(authRoutes, { prefix: '/v1.0' });

app.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: 'world' };
  },
});

const start = async () => {
  try {
    await app.listen({ port: 4009 });

    const address = app.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.log(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
