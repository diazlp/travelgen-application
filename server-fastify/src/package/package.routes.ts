import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { findAllSchema, findOneSchema } from './package.schema';
import PackageService from './package.service';

export function packageRoutes(
  fastify: FastifyInstance,
  _: any,
  done: DoneFuncWithErrOrRes,
) {
  fastify.route({
    method: 'GET',
    url: '/package/find-all',
    schema: findAllSchema,
    handler: PackageService.findAllHandler,
  });

  fastify.route({
    method: 'GET',
    url: '/package/find-one/:id',
    schema: findOneSchema,
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      PackageService.findOneHandler(fastify, request, reply);
    },
  });
  done();
}
