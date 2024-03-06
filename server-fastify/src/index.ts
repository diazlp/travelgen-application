import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyJwt from '@fastify/jwt';
import fastifyStripe from 'fastify-stripe';

import { swaggerOptions, swaggerUIOptions } from '../lib/swagger/options';

import { authRoutes } from './auth/auth.routes';
import { healthRoutes } from './health/health.routes';
import { transactionRoutes } from './transaction/transaction.routes';
import { packageRoutes } from './package/package.routes';

const app: FastifyInstance = fastify({
  logger: false,
});

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

/*Register Swagger Documentation*/
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUIOptions);

/*Register Stripe API*/
app.register(fastifyStripe, { apiKey: process.env.STRIPE_SECRET_KEY });

/*Register Routes*/
app.register(healthRoutes, { prefix: '/v1.0' });
app.register(authRoutes, { prefix: '/v1.0' });
app.register(packageRoutes, { prefix: '/v1.0' });
app.register(transactionRoutes, { prefix: '/v1.0' });

const start = async () => {
  try {
    await app.listen({ port: 4009 });

    const address = app.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.log(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
