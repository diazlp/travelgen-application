import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ITestimonyModel } from 'lib/types/interface';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default class TestimonyService {
  static async findAllHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{
      Querystring: {
        destination: string;
      };
    }>,
    reply: FastifyReply,
  ): Promise<ITestimonyModel[] | { message: string }> {
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

  static async createHandler(
    fastify: FastifyInstance,
    request: FastifyRequest<{
      Headers: {
        email: string;
      };
      Body: {
        review: string;
        rating: number;
        destination: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { email } = JSON.parse(request.headers.authorization);
    const { review, rating, destination } = request.body;

    try {
      if (rating <= 0 || rating > 5) {
        return reply
          .status(400)
          .send({ message: 'Rating must be between 1 and 5' });
      }

      const packageData = await prisma.package.findFirst({
        where: {
          name: destination,
        },
      });

      if (!packageData) {
        return reply.status(404).send({ message: 'Destination not found.' });
      }

      const userData = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: true,
        },
      });

      const collection = fastify.mongo.client
        .db('travelgen')
        .collection('testimonies');

      await collection.insertOne({
        full_name: userData.full_name,
        avatar: userData.profile.avatar,
        location: userData.profile.location,
        review,
        rating,
        destination,
        checkout_at: new Date(),
      });

      return reply
        .status(200)
        .send({ message: 'New testimony has been added.' });
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error.' });
    }
  }
}
