import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { loginSchema, registerSchema } from './auth.schema';
import AuthService from './auth.service';

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
      // E.g. check authentication
    },
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      AuthService.loginHandler(fastify, request, reply);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/auth/register',
    schema: registerSchema,
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      AuthService.registerHandler(fastify, request, reply);
    },
  });

  done();
}
