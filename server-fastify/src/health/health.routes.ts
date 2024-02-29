import {
  DoneFuncWithErrOrRes,
  FastifyInstance,
  FastifyReply,
  RouteShorthandOptions,
} from 'fastify';

export function healthRoutes(
  fastify: FastifyInstance,
  opts: RouteShorthandOptions,
  done: DoneFuncWithErrOrRes,
) {
  opts = {
    schema: {
      tags: ['Health'],
      summary: 'Health check endpoint',
      description: 'Returns api health',
      response: {
        200: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          example: {
            message: 'Health checked.',
          },
        },
      },
    },
  };

  fastify.get('/health', opts, async (_, reply: FastifyReply) => {
    return reply.status(200).send({ message: 'Health checked.' });
  });

  done();
}
