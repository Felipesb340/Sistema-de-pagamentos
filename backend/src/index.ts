import { buildServer } from "./server";
import { env } from "./config/env";

async function main() {
  const app = buildServer();

  try {
    await app.listen({
      port: Number(env.PORT),
      host: "0.0.0.0"
    });

    app.log.info(`Servidor rodando na porta ${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
