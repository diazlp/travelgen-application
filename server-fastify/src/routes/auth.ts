import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

export function authRoutes(
  fastify: FastifyInstance,
  _: any,
  done: DoneFuncWithErrOrRes,
) {
  fastify.route({
    method: 'POST',
    url: '/auth/login',
    schema: {
      tags: ['Auth'],
      summary: 'User login endpoint',
      description: 'Returns user login credentials',
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
          example: {
            message: 'Login checked',
          },
        },
      },
    },

    // this function is executed for every request before the handler is executed
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      console.log(request.body, '<<< ini bos');

      reply.code(201).send({ message: 'Login checked' });
    },
  });

  // fastify.get('/auth/login', async (request, reply) => {
  //   reply.send('Login Here');
  // });

  fastify.get('/auth/register', async (request, reply) => {
    reply.send('Register here');
  });

  done();
}
