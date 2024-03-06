import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { findAllSchema } from './testimony.schema';
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

  done();
}
