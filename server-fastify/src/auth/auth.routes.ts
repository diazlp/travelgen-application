import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import {
  loginSchema,
  registerSchema,
  profileSchema,
  updateProfileSchema,
} from './auth.schema';
import Middleware from '../middleware';
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

  fastify.route({
    method: 'GET',
    url: '/auth/profile',
    schema: profileSchema,
    preHandler: (
      request: FastifyRequest<any>,
      reply: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => {
      Middleware.verifyToken(fastify, request, reply, done);
    },
    handler: AuthService.profileHandler,
  });

  fastify.route({
    method: 'PUT',
    url: '/auth/profile',
    schema: updateProfileSchema,
    preHandler: (
      request: FastifyRequest<any>,
      reply: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => {
      Middleware.verifyToken(fastify, request, reply, done);
    },
    handler: AuthService.updateProfileHandler,
  });

  done();
}
