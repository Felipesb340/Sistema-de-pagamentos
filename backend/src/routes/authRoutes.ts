import type { FastifyInstance } from "fastify";
import { login, register } from "../controllers/authController";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/auth/register", register);
  fastify.post("/auth/login", login);
}
