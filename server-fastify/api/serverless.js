'use strict';

// Read the .env file.
import * as dotenv from 'dotenv';
dotenv.config();

// Require the framework
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyJwt from '@fastify/jwt';
import fastifyStripe from 'fastify-stripe';
import fastifyPrismaClient from 'fastify-prisma-client';
import fastifyMongodb from '@fastify/mongodb';

import { swaggerOptions, swaggerUIOptions } from '../lib/swagger/options';

import { healthRoutes } from '../src/health/health.routes';
import { authRoutes } from '../src/auth/auth.routes';
import { packageRoutes } from '../src/package/package.routes';
import { categoryRoutes } from '../src/category/category.routes';
import { testimonyRoutes } from '../src/testimony/testimony.routes';
import { transactionRoutes } from '../src/transaction/transaction.routes';

// Instantiate Fastify with some config
const app = fastify({
  logger: false,
});

// Register your application as a normal plugin.
// app.register(require('../src/index'));
/*Application Cross-Origin Resource Sharing (CORS)*/
app.register(cors, { origin: '*' });

/*Register Bcrypt Hashing*/
app.register(fastifyBcrypt, {
  saltWorkFactor: 10,
});

/*Register Authorization with JWT*/
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET_KEY,
});

/*Register MongoDB*/
app.register(fastifyMongodb, {
  forceClose: true,
  url: process.env.MONGODB_URI,
});

/*Register Swagger Documentation*/
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUIOptions);

/*Register Stripe API*/
app.register(fastifyStripe, { apiKey: process.env.STRIPE_SECRET_KEY });

/*Register Routes*/
app.register(healthRoutes, { prefix: '/v1.0' });
app.register(authRoutes, { prefix: '/v1.0' });
app.register(packageRoutes, { prefix: '/v1.0' });
app.register(categoryRoutes, { prefix: '/v1.0' });
app.register(testimonyRoutes, { prefix: '/v1.0' });
app.register(transactionRoutes, { prefix: '/v1.0' });

export default async (req, res) => {
  await app.ready();
  app.server.emit('request', req, res);
};
