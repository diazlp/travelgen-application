import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { IPackageModel } from 'lib/types/interface';

const prisma = new PrismaClient();

export default class PackageService {
  static async findAllHandler(
    _: FastifyRequest,
    reply: FastifyReply,
  ): Promise<IPackageModel[] | { message: string }> {
    try {
      const packages = await prisma.package.findMany();

      return reply.status(200).send(packages);
    } catch (error) {
      console.log(error, '<< lu kenapa?');
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }

  static async findOneHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<IPackageModel | { message: string }> {
    try {
      const { id } = request.params;
      const pkg = await prisma.package.findFirst({
        where: {
          id: +id,
        },
      });

      const testimonies = await fastify.mongo.client
        .db('travelgen')
        .collection('testimonies')
        .aggregate([
          {
            $match: {
              destination: pkg.name,
            },
          },
          {
            $limit: 4,
          },
        ])
        .toArray();

      return reply.status(200).send({
        ...pkg,
        testimonies,
      });
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }
}
