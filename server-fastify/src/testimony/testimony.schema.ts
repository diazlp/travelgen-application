import { FastifySchema } from 'fastify';

export const findAllSchema: FastifySchema = {
  tags: ['Testimony'],
  summary: 'Get testimonies endpoint',
  querystring: {
    type: 'object',
    properties: {
      destination: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Get testimonies response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          full_name: { type: 'string' },
          avatar: { type: 'string' },
          location: { type: 'string' },
          review: { type: 'string' },
          rating: { type: 'number' },
          destination: { type: 'string' },
          checkout_at: { type: 'string', format: 'date' },
        },
      },
      example: [
        {
          _id: '65e83930343a86075a90348c',
          full_name: 'Diaz Linggaputra',
          avatar:
            'https://diazlinggaputra.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fdiazlp-photo.png&w=384&q=75',
          location: 'Indonesia',
          review: 'It was great!',
          rating: 4,
          destination: 'Nusa Penida, Bali',
          departure_date: new Date('2020-04-25'),
        },
      ],
    },
  },
};

export const createSchema: FastifySchema = {
  tags: ['Testimony'],
  summary: 'Create testimony endpoint',
  security: [
    {
      ApiToken: [],
    },
  ],
  body: {
    type: 'object',
    properties: {
      review: { type: 'string' },
      rating: { type: 'number' },
      destination: { type: 'string' },
    },
    required: ['review', 'rating', 'destination'],
  },
  response: {
    200: {
      description: 'Testimony created',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'New testimony has been added.',
      },
    },
    404: {
      description: 'Destination not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Destination not found.',
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
      description: 'Bad request',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Rating must be between 1 and 5',
      },
    },
  },
};
