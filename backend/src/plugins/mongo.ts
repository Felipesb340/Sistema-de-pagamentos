import fp from "fastify-plugin";
import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

async function mongoConnector(fastify: FastifyInstance) {
  try {
    await mongoose.connect(env.MONGO_URI);
    fastify.log.info("MongoDB conectado");
  } catch (error) {
    fastify.log.error("Erro ao conectar no MongoDB");
    fastify.log.error(error);
    process.exit(1);
  }
}

export default fp(mongoConnector);
