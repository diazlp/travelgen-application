import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import {
  findAllSchema,
  findOneSchema,
  findAllCategorySchema,
  findAllTestimonySchema,
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
    url: '/category/find-all',
    schema: findAllCategorySchema,
    handler: (_: FastifyRequest<any>, reply: FastifyReply) => {
      PackageService.findAllCategoryHandler(fastify, reply);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/testimony/find-all',
    schema: findAllTestimonySchema,
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      PackageService.findAllTestimonyHandler(fastify, request, reply);
    },
  });

  done();
}
