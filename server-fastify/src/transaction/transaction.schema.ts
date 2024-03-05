import { FastifySchema } from 'fastify';

export const paymentSchema: FastifySchema = {
  tags: ['Transaction'],
  summary: 'Order payment endpoint',
  security: [
    {
      ApiToken: [],
    },
  ],
  body: {
    type: 'object',
    properties: {
      session_id: { type: 'string' },
      package_id: { type: 'number' },
      quantity: { type: 'number' },
    },
    required: ['session_id', 'package_id', 'quantity'],
  },
  response: {
    200: {
      description: 'Payment verified',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Payment has been verified',
      },
    },
    404: {
      description: 'Payment not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Payment not found.',
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Unauthorized.',
      },
    },
    400: {
      description: 'Payment not verified',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message:
          'Payment not verified. Please check your payment or contact administrator.',
      },
    },
  },
};
