import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { DEFAULT_AVATAR } from '../../lib/constants';
import MailService from '../../src/mail/mail.service';

const prisma = new PrismaClient();

export default class AuthService {
  private static generateVerificationCode(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

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
      reply.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static async registerHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{
      Body: { fullName: string; email: string; password: string };
    }>,
    reply: FastifyReply,
  ): Promise<{ message: string }> {
    const { fullName, email, password } = request.body;

    const hashedPassword = await fastify.bcrypt.hash(password);

    const verificationCode = AuthService.generateVerificationCode(5);

    try {
      const newUser = await prisma.user.create({
        data: {
          full_name: fullName,
          email,
          password: hashedPassword,
          verification_code: verificationCode,
        },
      });

      await prisma.profile.create({
        data: {
          user_id: newUser.id,
          avatar: DEFAULT_AVATAR,
        },
      });

      await MailService.emailVerification({
        fullName,
        email,
        verificationCode,
      });

      return reply.status(201).send({ message: 'Register successful' });
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }
}
