import Stripe from 'stripe';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';

enum PaymentStatus {
  open = 'open',
  complete = 'complete',
}

export default class TransactionService {
  static async paymentHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{
      Headers: {
        id: string;
      };
      Body: { session_id: string; package_id: number; quantity: number };
    }>,
    reply: FastifyReply,
  ): Promise<{ message: string }> {
    const { id } = JSON.parse(request.headers.authorization);
    const { session_id, package_id, quantity } = request.body;

    try {
      const session = await fastify.stripe.checkout.sessions.retrieve(
        session_id,
      );

      if (session.status === PaymentStatus.open) {
        return reply.status(400).send({
          message:
            'Payment not verified. Please check your payment or contact administrator.',
        });
      }

      await fastify.prisma.transaction.create({
        data: {
          user_id: id,
          package_id: package_id,
          quantity: Math.max(quantity, 1),
          is_paid: true,
          checkout_at: new Date(),
        },
      });

      return reply.status(200).send({ message: 'Payment has been verified' });
    } catch (error: any) {
      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        return reply.status(404).send({ message: 'Payment not found.' });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          return reply
            .status(500)
            .send({ code: 'P2003', message: 'Package not found.' });
        }
      }
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }
}
