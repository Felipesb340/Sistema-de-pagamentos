import { FastifyInstance, FastifyPluginAsync } from "fastify";
import {
  handleCreateTransaction,
  handleListTransactions
} from "../controllers/transactionController";

const transactionRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/transactions", handleCreateTransaction);
  fastify.get("/transactions", handleListTransactions);
};

export default transactionRoutes;
