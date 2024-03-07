import { FastifyReply, FastifyInstance } from 'fastify';
import { ICategoryModel } from 'lib/types/interface';

export default class CategoryService {
  static async findAllHandler(
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
}
