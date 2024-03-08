import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  profileSchema,
  updateProfileSchema,
  verifyEmailSchema,
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
    method: 'POST',
    url: '/auth/change-password',
    schema: changePasswordSchema,
    preHandler: (
      request: FastifyRequest<any>,
      reply: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => {
      Middleware.verifyToken(fastify, request, reply, done);
    },
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      AuthService.changePasswordHandler(fastify, request, reply);
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
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      AuthService.profileHandler(fastify, request, reply);
    },
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
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      AuthService.updateProfileHandler(fastify, request, reply);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/auth/verify-email',
    schema: verifyEmailSchema,
    preHandler: (
      request: FastifyRequest<any>,
      reply: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => {
      Middleware.verifyToken(fastify, request, reply, done);
    },
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      AuthService.verifyEmailHandler(fastify, request, reply);
    },
  });

  done();
}
