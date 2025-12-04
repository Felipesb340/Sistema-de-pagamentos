🧾 API de Autorização de Pagamentos

Backend do desafio técnico Tamborine.
Responsável por receber requisições de transação, aplicar regras de autorização e persistir o resultado.

🧱 Stack utilizada

Node.js + TypeScript

Fastify 5

MongoDB + Mongoose

JWT (autenticação)

Jest + Supertest (testes)

Dotenv

🚀 Como rodar o projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd backend

2️⃣ Criar arquivo .env

Crie um arquivo chamado .env dentro de backend/ contendo:

MONGO_URI=mongodb://localhost:27017/tamborine-payments
PORT=3333
JWT_SECRET=uma_chave_secreta_segura


⚠️ Dica: use um JWT_SECRET longo, com ao menos 32 caracteres.

3️⃣ Instalar dependências
npm install

4️⃣ Rodar em modo desenvolvimento
npm run dev


A API subirá em:

http://localhost:3333

🔐 Autenticação

O backend usa JWT.

Criar usuário
POST /auth/register

Login
POST /auth/login


Resposta:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}


O token deve ser enviado nas rotas protegidas:

Authorization: Bearer <token>

📡 Endpoints
🔒 Rotas protegidas (necessitam JWT)

POST /transactions

Cria e autoriza uma transação.

Body:

{
  "pan": "4111111111111111",
  "brand": "Visa",
  "amount": 500
}


Resposta:

{
  "_id": "...",
  "pan": "**** **** **** 1111",
  "brand": "Visa",
  "amount": 500,
  "status": "approved",
  "authorizationCode": "123456",
  "createdAt": "2025-12-03T00:00:00Z"
}

GET /transactions

Retorna todas as transações do sistema.

🧠 Regras de Negócio
✔️ Validações de entrada

PAN deve conter 16 dígitos numéricos

Bandeiras permitidas: Visa, Mastercard, Elo

amount > 0

Transações acima de 1000 são negadas

✔️ Regras de autorização

Se o valor for válido → APPROVED
→ Gera authorizationCode

Se inválido → DECLINED
→ Retorna reason

✔️ Segurança

PAN é sempre armazenado e retornado mascarado (**** **** **** 1234)

🧪 Rodar Testes
npm test


Testes cobrem:

Serviço authorizeTransaction

Rota POST /transactions

Rota GET /transactions

📁 Estrutura do projeto
backend/
 ├─ src/
 │   ├─ controllers/
 │   ├─ plugins/
 │   ├─ routes/
 │   ├─ services/
 │   ├─ models/
 │   ├─ config/
 │   └─ index.ts
 ├─ tests/
 ├─ package.json
 ├─ tsconfig.json
 └─ README.md

🛠️ Tecnologias principais

Fastify pela performance, baixo overhead e plugin ecosystem

MongoDB para armazenamento rápido e flexível

JWT para autenticação stateless

Jest para testes rápidos e isolados

✨ Autor

Feito como parte do desafio técnico Tamborine.