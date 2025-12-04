import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { User } from "../models/User";

interface AuthBody {
  email: string;
  password: string;
}

export async function register(
  request: FastifyRequest<{ Body: AuthBody }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return reply.code(400).send({ message: "E-mail já cadastrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });

  return reply.code(201).send({ id: user._id, email: user.email });
}

export async function login(
  request: FastifyRequest<{ Body: AuthBody }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  if (!user) {
    return reply.code(401).send({ message: "Credenciais inválidas" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return reply.code(401).send({ message: "Credenciais inválidas" });
  }

  const token = await reply.jwtSign({
    sub: user._id.toString(),
    email: user.email,
  });

  return reply.send({
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  });
}
