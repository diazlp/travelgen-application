import { FastifySchema } from 'fastify';

export const findAllSchema: FastifySchema = {
  tags: ['Package'],
  summary: 'All package endpoint',
  response: {
    200: {
      description: 'All packages response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          country: { type: 'string' },
          price: { type: 'number' },
          thumbnail: { type: 'string' },
          images: { type: 'array', items: { type: 'string' } },
          description: { type: 'string' },
          departure_date: { type: 'string', format: 'date' },
          rating: { type: 'number' },
          reviewers: { type: 'number' },
          is_promo: { type: 'boolean' },
        },
      },
      example: [
        {
          id: 5,
          name: 'Mount Bromo, Malang',
          country: 'Indonesia',
          price: 4560000,
          thumbnail:
            'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
          images: [
            'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
            'https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
            'https://images.unsplash.com/photo-1610114048194-998bbb62dc55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
            'https://images.unsplash.com/photo-1626515400076-832a6143b894?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
          ],
          description:
            'Embark on an adventure to Mount Bromo, Malang with a package for 2 including flights, 5 nights accommodation, guided tours, meals, off-road experience, and transportation.',
          departure_date: '2023-09-16T00:00:00.000Z',
          rating: 4,
          reviewers: 1600,
          is_promo: true,
        },
      ],
    },
  },
};

export const findOneSchema: FastifySchema = {
  tags: ['Package'],
  summary: 'One Package endpoint',
  response: {
    200: {
      description: 'One package response',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        country: { type: 'string' },
        price: { type: 'number' },
        thumbnail: { type: 'string' },
        images: { type: 'array', items: { type: 'string' } },
        description: { type: 'string' },
        departure_date: { type: 'string', format: 'date' },
        rating: { type: 'number' },
        reviewers: { type: 'number' },
        is_promo: { type: 'boolean' },
        created_at: { type: 'string', format: 'date' },
        updated_at: { type: 'string', format: 'date' },
      },
      example: {
        id: 5,
        name: 'Mount Bromo, Malang',
        country: 'Indonesia',
        price: 4560000,
        thumbnail:
          'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
        images: [
          'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
          'https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
          'https://images.unsplash.com/photo-1610114048194-998bbb62dc55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
          'https://images.unsplash.com/photo-1626515400076-832a6143b894?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
        ],
        description:
          'Embark on an adventure to Mount Bromo, Malang with a package for 2 including flights, 5 nights accommodation, guided tours, meals, off-road experience, and transportation.',
        departure_date: new Date('2023-09-16'),
        rating: 4,
        reviewers: 1600,
        is_promo: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    },
  },
};

export const categoriesSchema: FastifySchema = {
  tags: ['Package'],
  summary: 'Package categories endpoint',
  response: {
    200: {
      description: 'All categories response',
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
    // 404: {
    //   description: 'Payment not found',
    //   type: 'object',
    //   properties: {
    //     message: { type: 'string' },
    //   },
    //   example: {
    //     message: 'Payment not found.',
    //   },
    // },
    // 401: {
    //   description: 'Unauthorized',
    //   type: 'object',
    //   properties: {
    //     message: { type: 'string' },
    //   },
    //   example: {
    //     message: 'Unauthorized.',
    //   },
    // },
    // 400: {
    //   description: 'Payment not verified',
    //   type: 'object',
    //   properties: {
    //     message: { type: 'string' },
    //   },
    //   example: {
    //     message:
    //       'Payment not verified. Please check your payment or contact administrator.',
    //   },
    // },
  },
};
