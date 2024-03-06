import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import {
  findAllSchema,
  findOneSchema,
  categoriesSchema,
} from './package.schema';
import Middleware from '../middleware';
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
    handler: PackageService.findOneHandler,
  });

  fastify.route({
    method: 'GET',
    url: '/package/categories',
    schema: categoriesSchema,
    handler: (_: FastifyRequest<any>, reply: FastifyReply) => {
      PackageService.categoriesHandler(fastify, reply);
    },
  });

  done();
}
