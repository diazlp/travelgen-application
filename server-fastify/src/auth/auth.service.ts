import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';
import prisma from '../../lib/utils/prisma';
import { DEFAULT_AVATAR } from '../../lib/constants';
import MailService from '../../src/mail/mail.service';

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
        id: user.id,
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return reply
            .status(500)
            .send({ code: 'P2002', message: 'Unique constraint violation.' });
        }
      }
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }

  static async changePasswordHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{
      Headers: {
        email: string;
      };
      Body: { password: string };
    }>,
    reply: FastifyReply,
  ): Promise<{ message: string }> {
    const { email } = JSON.parse(request.headers.authorization);
    const { password } = request.body;

    const hashedPassword = await fastify.bcrypt.hash(password);

    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
        },
      });

      return reply.status(200).send({ message: 'Password has been changed' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return reply
            .status(500)
            .send({ code: 'P2025', message: 'No user found.' });
        }
      }
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }

  static async profileHandler(
    request: FastifyRequest<{
      Headers: {
        email: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<any> {
    const { email } = JSON.parse(request.headers.authorization);

    try {
      const userProfile = await prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          full_name: true,
          role: true,
          is_verified: true,
          verification_code: true,
          created_at: true,
          profile: {
            select: {
              avatar: true,
              date_of_birth: true,
              location: true,
              biography: true,
              interests: true,
            },
          },
          transactions: {
            select: {
              quantity: true,
              is_paid: true,
              checkout_at: true,
              package: {
                select: {
                  id: true,
                  name: true,
                  country: true,
                  thumbnail: true,
                  description: true,
                  departure_date: true,
                  rating: true,
                  reviewers: true,
                },
              },
            },
          },
        },
      });

      return reply.status(200).send(userProfile);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return reply
            .status(500)
            .send({ code: 'P2025', message: 'No user found.' });
        }
      }
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }

  static async updateProfileHandler(
    request: FastifyRequest<{
      Body: {
        full_name: string;
        location: string;
        biography: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<any> {
    const { email } = JSON.parse(request.headers.authorization);
    const { full_name, location, biography } = request.body;

    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          full_name,
          profile: {
            update: {
              location,
              biography,
            },
          },
        },
      });

      return reply.status(200).send({ message: 'Profile has been updated' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return reply
            .status(500)
            .send({ code: 'P2025', message: 'No user found.' });
        }
      }
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }

  static async verifyEmailHandler(
    request: FastifyRequest<{
      Headers: {
        email: string;
      };
      Body: { verification_code: string };
    }>,
    reply: FastifyReply,
  ): Promise<{ message: string }> {
    const { email, verificationCode } = JSON.parse(
      request.headers.authorization,
    );
    const { verification_code } = request.body;

    if (verification_code.toLowerCase() !== verificationCode.toLowerCase()) {
      return reply
        .status(400)
        .send({ message: 'Verification code is invalid.' });
    }

    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          is_verified: true,
        },
      });
      return reply.status(200).send({ message: 'Password has been changed' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return reply
            .status(500)
            .send({ code: 'P2025', message: 'No user found.' });
        }
      }
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }
}
