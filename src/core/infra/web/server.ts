import fastify from "fastify";
import routes from "./api/v1/routes";
import { logger } from "../lib/logger";
import { fastifyErrorHandler } from "../lib/fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";

const port = process.env.API_PORT || 5000;

export const startServer = async () => {
  try {
    const server = fastify({
      logger,
    });

    // register security modules
    void server.register(fastifyCors);
    void server.register(fastifyHelmet);

    // register routes
    void server.register(routes, { prefix: "/api/v1" });

    // register error handler
    server.setErrorHandler(fastifyErrorHandler);

    if (process.env.NODE_ENV === "production") {
      for (const signal of ["SIGINT", "SIGTERM"]) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`);
            process.exit(err ? 1 : 0);
          })
        );
      }
    }

    const serverOptions: any = {
      port,
    };
    await server.listen(serverOptions);
    // console.log(`server listening on ${port}`);
  } catch (e) {
    console.error(e);
  }
};

process.on("unhandledRejection", (e) => {
  console.error(e);
  process.exit(1);
});
