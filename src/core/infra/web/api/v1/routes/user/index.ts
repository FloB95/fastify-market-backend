import {
  type FastifyRequest,
  type FastifyPluginCallback,
  type FastifyReply,
} from "fastify";

const UserRouter: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.statusCode = 200;
    void reply.send({
      message: "Hello World",
    });
  });

  done();
};

export default UserRouter;
