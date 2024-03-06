import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PrismaClient, Prisma, Package } from '@prisma/client';

const prisma = new PrismaClient();

export default class PackageService {
  static async findAllHandler(
    _: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Package[] | { message: string }> {
    try {
      const packages = await prisma.package.findMany();

      return reply.status(200).send(packages);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }

  static async findOneHandler(
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<Package | { message: string }> {
    try {
      const { id } = request.params;
      const pkg = await prisma.package.findFirst({
        where: {
          id: +id,
        },
      });

      return reply.status(200).send(pkg);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }
}