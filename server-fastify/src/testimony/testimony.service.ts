import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ITestimonyModel } from 'lib/types/interface';

export default class TestimonyService {
  static async findAllHandler(
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
