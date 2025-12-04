import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import jwtPlugin from "./plugins/jwt";
import mongoPlugin from "./plugins/mongo";
import { authRoutes } from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";

export function buildServer(): FastifyInstance {
  const fastify = Fastify({
    logger: true
  });

  fastify.register(jwtPlugin);

  fastify.register(cors, {
    origin: true
  });

  fastify.register(authRoutes);
  fastify.register(mongoPlugin);
  fastify.register(transactionRoutes);

  return fastify;
}
