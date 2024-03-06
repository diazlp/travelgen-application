import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { findAllSchema, createSchema } from './testimony.schema';
import Middleware from '../middleware';
import TestimonyService from './testimony.service';

export function testimonyRoutes(
  fastify: FastifyInstance,
  _: any,
  done: DoneFuncWithErrOrRes,
) {
  fastify.route({
    method: 'GET',
    url: '/testimony/find-all',
    schema: findAllSchema,
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      TestimonyService.findAllHandler(fastify, request, reply);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/testimony/create',
    schema: createSchema,
    preHandler: (
      request: FastifyRequest<any>,
      reply: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => {
      Middleware.verifyToken(fastify, request, reply, done);
    },
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      TestimonyService.createHandler(fastify, request, reply);
    },
  });

  done();
}
