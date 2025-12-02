import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import mongoPlugin from "./plugins/mongo";
import transactionRoutes from "./routes/transactionRoutes";

export function buildServer(): FastifyInstance {
  const fastify = Fastify({
    logger: true
  });

  fastify.register(cors, {
    origin: true
  });

  fastify.get("/", async () => {
    return { status: "ok", message: "API do sistema rodando" };
  });

  fastify.register(mongoPlugin);
  fastify.register(transactionRoutes);

  return fastify;
}
