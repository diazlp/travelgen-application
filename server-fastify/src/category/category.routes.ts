import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { findAllSchema } from './category.schema';
import CategoryService from './category.service';

export function categoryRoutes(
  fastify: FastifyInstance,
  _: any,
  done: DoneFuncWithErrOrRes,
) {
  fastify.route({
    method: 'GET',
    url: '/category/find-all',
    schema: findAllSchema,
    handler: (_: FastifyRequest<any>, reply: FastifyReply) => {
      CategoryService.findAllHandler(fastify, reply);
    },
  });

  done();
}
