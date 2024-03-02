import { FastifySchema } from 'fastify';

export const loginSchema: FastifySchema = {
  tags: ['Auth'],
  summary: 'User login endpoint',
  description: 'Returns user login credentials',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      description: 'Login success',
      type: 'object',
      properties: {
        token: { type: 'string' },
        message: { type: 'string' },
      },
      example: {
        token: 'your-auth-token',
        message: 'Login successful',
      },
    },
    401: {
      description: 'Incorrect credentials',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Incorrect email and/or password',
      },
    },
  },
};

export const registerSchema: FastifySchema = {
  tags: ['Auth'],
  summary: 'User register endpoint',
  body: {
    type: 'object',
    properties: {
      fullName: {
        type: 'string',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: { type: 'string' },
    },
    required: ['fullName', 'email', 'password'],
  },
  response: {
    201: {
      description: 'Register success',
      type: 'object',
      properties: {
        token: { type: 'string' },
        message: { type: 'string' },
      },
      example: {
        message: 'Register successful',
      },
    },
  },
};

export const profileSchema: FastifySchema = {
  tags: ['Auth'],
  summary: 'User profile endpoint',
  security: [
    {
      ApiToken: [],
    },
  ],
  response: {
    200: {
      description: 'User profile',
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        full_name: { type: 'string' },
        role: { type: 'string' },
        is_verified: { type: 'boolean' },
        verification_code: { type: 'string' },
        created_at: { type: 'string', format: 'date' },
        profile: {
          type: 'object',
          properties: {
            avatar: { type: 'string' },
            date_of_birth: { type: 'string', format: 'date' },
            location: { type: 'string' },
            biography: { type: 'string' },
            interests: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      example: {
        id: 1,
        email: 'diazlinggaputra@gmail.com',
        full_name: 'Diaz Linggaputra',
        role: 'User',
        is_verified: true,
        verification_code: 'abcde',
        created_at: new Date(),
        profile: {
          avatar:
            'https://diazlinggaputra.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fdiazlp-photo.png&w=384&q=75',
          date_of_birth: new Date('1997-05-23'),
          location: 'Indonesia',
          biography:
            'When I grow up, I want to visit 300 countries. But now I am still young',
          interests: ['Asia'],
        },
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
  },
};
