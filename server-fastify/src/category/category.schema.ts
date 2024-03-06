import { FastifySchema } from 'fastify';

export const findAllSchema: FastifySchema = {
  tags: ['Category'],
  summary: 'Get categories endpoint',
  response: {
    200: {
      description: 'Get categories response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          thumbnail: { type: 'string' },
        },
      },
      example: [
        {
          _id: '65e83930343a86075a90348c',
          name: 'Europe',
          thumbnail:
            'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
        },
      ],
    },
  },
};
