import {
  FastifyRequest,
  FastifyReply,
  DoneFuncWithErrOrRes,
  FastifyInstance,
} from 'fastify';

export default class Middleware {
  /**
   * Verifies the JWT token from the request headers.
   * If the token is valid, attaches the decoded token to the request body.
   * If the token is not provided or invalid, sends a 401 Unauthorized response.
   * @param fastify - The Fastify instance.
   * @param request - The FastifyRequest object representing the incoming request.
   * @param reply - The FastifyReply object representing the response to the request.
   * @param done - The done function to be called when the middleware processing is complete.
   */
  static async verifyToken(
    fastify: FastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes,
  ) {
    // Extract token from request headers
    const token = request.headers.authorization;

    // Check if token is provided
    if (!token) {
      // Send 401 Unauthorized response if token is not provided
      return reply.status(401).send({ message: 'Unauthorized.' });
    }

    try {
      // Verify the token using Fastify JWT
      const decodedToken = fastify.jwt.verify(token);

      // Attach the decoded token to the request body
      request.body = decodedToken;
    } catch (error) {
      // Send 401 Unauthorized response if token is invalid
      return reply.status(401).send({ message: 'Unauthorized.' });
    }

    // Call done to continue with the request handling
    done();
  }
}
