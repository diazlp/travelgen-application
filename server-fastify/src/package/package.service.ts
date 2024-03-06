import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { PrismaClient, Package } from '@prisma/client';
import { ICategoryModel, ITestimonyModel } from 'lib/types/interface';

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

  static async findAllCategoryHandler(
    fastify: FastifyInstance,
    reply: FastifyReply,
  ): Promise<ICategoryModel | { message: string }> {
    try {
      const collection = fastify.mongo.client
        .db('travelgen')
        .collection('categories');

      const categories = await collection.find({}).toArray();

      return reply.status(200).send(categories);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }

  static async findAllTestimonyHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{
      Querystring: {
        destination: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { destination } = request.query;

    try {
      const collection = fastify.mongo.client
        .db('travelgen')
        .collection('testimonies');

      let testimonies: ITestimonyModel | any;
      if (destination) {
        testimonies = await collection
          .aggregate([
            {
              $match: {
                destination,
              },
            },
            {
              $limit: 4,
            },
          ])
          .toArray();
      } else {
        testimonies = await collection
          .aggregate([
            {
              $sample: { size: 4 },
            },
          ])
          .toArray();
      }

      return reply.status(200).send(testimonies);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }
}
