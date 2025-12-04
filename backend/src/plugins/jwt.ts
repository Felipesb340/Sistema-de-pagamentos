import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "../config/env";

export default fp(async (fastify: FastifyInstance) => {
  if (!env.JWT_SECRET) {
    fastify.log.error("JWT_SECRET não definido");
    process.exit(1);
  }

  await fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  fastify.decorate(
    "authenticate",
    async function (request: any, reply: any) {
      try {
        const payload = await request.jwtVerify();
        request.user = payload;
      } catch (err: any) {
        request.log.error(err);
        return reply.code(401).send({
          message: "Não autorizado",
          reason: err?.message || "Token inválido",
        });
      }
    }
  );
});
