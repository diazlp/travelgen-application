import { FastifySchema } from 'fastify';

export const loginSchema: FastifySchema = {
  tags: ['Auth'],
  summary: 'User login endpoint',
  description: 'Returns user login credentials',
  // security: [
  //   {
  //     ApiToken: [],
  //     Oauth2Token: [],
  //   },
  // ],
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
  // security: [
  //   {
  //     ApiToken: [],
  //   },
  // ],
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
      type: 'object',
      properties: {
        token: { type: 'string' },
        message: { type: 'string' },
      },
      example: {
        message: 'Register successful',
      },
    },
    // 401: {
    //   type: 'object',
    //   properties: {
    //     message: { type: 'string' },
    //   },
    //   example: {
    //     message: 'Incorrect email and/or password',
    //   },
    // },
  },
};
