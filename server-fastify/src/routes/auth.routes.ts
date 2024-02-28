import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { loginSchema } from '../schemas/auth.schema';
import AuthService from '../services/auth.service';

export function authRoutes(
  fastify: FastifyInstance,
  _: any,
  done: DoneFuncWithErrOrRes,
) {
  fastify.route({
    method: 'POST',
    url: '/auth/login',
    schema: loginSchema,
    preHandler: async (
      request: FastifyRequest,
      reply: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => {
      console.log(request.headers);
      // E.g. check authentication
    },
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      AuthService.loginHandler(fastify, request, reply);
    },
  });

  fastify.get('/auth/register', async (request, reply) => {
    reply.send('Register here');
  });

  done();
}
