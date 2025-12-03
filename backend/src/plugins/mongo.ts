import fp from "fastify-plugin";
import mongoose from "mongoose";
import { FastifyInstance } from "fastify";
import { env } from "../config/env";

async function mongoConnector(fastify: FastifyInstance) {
  const uri = env.MONGO_URI; // copia pra uma variável local

  if (!uri) {
    fastify.log.error("ERRO: MONGO_URI não está definida nas variáveis de ambiente");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    fastify.log.info("✅ MongoDB conectado");
  } catch (error) {
    fastify.log.error("Erro ao conectar no MongoDB");
    fastify.log.error(error);
    process.exit(1);
  }
}

export default fp(mongoConnector);
