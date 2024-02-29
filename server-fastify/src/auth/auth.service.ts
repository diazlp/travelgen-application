import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class AuthService {
  static async loginHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply,
  ): Promise<{ token: string; message: string }> {
    const { email, password } = request.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return reply
          .status(401)
          .send({ message: 'Incorrect email and/or password' });
      }

      const passwordMatch = await fastify.bcrypt.compare(
        password,
        user.password,
      );

      if (!passwordMatch) {
        return reply.status(401).send({
          message: 'Invalid credentials',
        });
      }

      const jwt = fastify.jwt.sign({
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        isVerified: user.is_verified,
        verificationCode: user.verification_code,
      });

      return reply
        .status(200)
        .send({ token: jwt, message: 'Login successful' });
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
