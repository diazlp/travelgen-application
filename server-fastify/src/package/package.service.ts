import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import prisma from '../../lib/utils/prisma';
import { IPackageModel } from 'lib/types/interface';

export default class PackageService {
  static async findAllHandler(
    _: FastifyRequest,
    reply: FastifyReply,
  ): Promise<IPackageModel[] | { message: string }> {
    try {
      const packages = await prisma.package.findMany();

      return reply.status(200).send(packages);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    } finally {
      await prisma.$disconnect();
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
    } finally {
      await prisma.$disconnect();
    }
  }
}
