import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

const app: FastifyInstance = fastify({ logger: false });

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
};

app.get('/ping', opts, async (request, reply) => {
  reply.send('pong');
});

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
