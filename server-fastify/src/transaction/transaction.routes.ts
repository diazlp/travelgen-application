import {
  FastifyInstance,
  DoneFuncWithErrOrRes,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { paymentSchema } from './transaction.schema';
import Middleware from '../middleware';
import TransactionService from './transaction.service';

export function transactionRoutes(
  fastify: FastifyInstance,
  _: any,
  done: DoneFuncWithErrOrRes,
) {
  fastify.route({
    method: 'POST',
    url: '/transaction/payment',
    schema: paymentSchema,
    preHandler: (
      request: FastifyRequest<any>,
      reply: FastifyReply,
      done: DoneFuncWithErrOrRes,
    ) => {
      Middleware.verifyToken(fastify, request, reply, done);
    },
    handler: (request: FastifyRequest<any>, reply: FastifyReply) => {
      TransactionService.paymentHandler(fastify, request, reply);
    },
  });

  done();
}
