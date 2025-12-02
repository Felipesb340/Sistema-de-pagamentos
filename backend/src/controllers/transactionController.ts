import { FastifyReply, FastifyRequest } from "fastify";
import {
  AuthorizeInput,
  createTransaction,
  listTransactions
} from "../services/transactionService";

export async function handleCreateTransaction(
  request: FastifyRequest<{ Body: AuthorizeInput }>,
  reply: FastifyReply
) {
  const { pan, brand, amount } = request.body;

  if (!pan || !brand || amount === undefined || amount === null) {
    return reply
      .status(400)
      .send({ message: "Campos obrigatórios ausentes" });
  }

  try {
    const tx = await createTransaction({
      pan,
      brand,
      amount: Number(amount)
    });

    return reply.status(201).send(tx);
  } catch (error) {
    request.log.error(error);
    return reply
      .status(500)
      .send({ message: "Erro ao criar transação" });
  }
}

export async function handleListTransactions(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const list = await listTransactions();
    return reply.send(list);
  } catch (error) {
    _request.log.error(error);
    return reply
      .status(500)
      .send({ message: "Erro ao listar transações" });
  }
}
