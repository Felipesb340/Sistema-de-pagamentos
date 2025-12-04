🌐 Sistema de Autorização de Pagamentos

Aplicação full-stack desenvolvida para o desafio técnico Tamborine, composta por:

Backend (Fastify + TypeScript + MongoDB)

Regras de autorização

API autenticada com JWT

Persistência em MongoDB

Testes automatizados com Jest

Frontend (React + Redux Toolkit + Tailwind CSS)

Tela de login

Simulador de transações

Listagem de transações

Consumo seguro da API via JWT

Interface inspirada no design da Tamborine

🚀 Como rodar o projeto
🔧 1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd sistema-autorizacao

🖥️ 2. Backend
Entrar no diretório:
cd backend

Instalar dependências:
npm install

Criar .env:
MONGO_URI=mongodb://localhost:27017/tamborine-payments
PORT=3333
JWT_SECRET=uma_chave_segura_de_32_caracteres

Rodar em desenvolvimento:
npm run dev


A API subirá em:

http://localhost:3333


Documentação detalhada:
👉 README do Backend

🌐 3. Frontend
Entrar no diretório:
cd frontend

Instalar dependências:
npm install

Criar .env:
VITE_API_URL=http://localhost:3333

Rodar em desenvolvimento:
npm run dev


A aplicação subirá em:

http://localhost:5173


Documentação detalhada:
👉 README do Frontend

📁 Estrutura do repositório
backend/
  src/
  tests/
  README.md

frontend/
  src/
  README.md

README.md  ← este arquivo

⚙️ Tecnologias utilizadas
Backend

Fastify 5

TypeScript

MongoDB + Mongoose

JWT

Fastify Plugins

Jest + Supertest

Frontend

React 18

Vite

Redux Toolkit

Axios

Tailwind CSS

TypeScript

🔐 Fluxo principal da aplicação

Usuário acessa a tela de login

Realiza autenticação (/auth/login)

Recebe JWT

Token é armazenado no localStorage

Axios adiciona automaticamente o header Authorization: Bearer <token>

Usuário acessa o Painel de Transações

Pode:

Enviar nova transação

Visualizar histórico

Atualizar lista

Fazer logout

Rotas protegidas pelo backend requerem autenticação.

🧠 Sobre as regras de autorização

PAN deve ter 16 dígitos

Bandeiras aceitas: Visa, Mastercard, Elo

Valores acima de 1000 são negados

PAN é sempre mascarado

Transações aprovadas recebem authorizationCode

Transações negadas retornam reason

🧪 Testes

Os testes do backend podem ser rodados com:

  cd backend
  npm test


Cobrindo:

  lógica de autorização

  rotas /transactions

  resposta da API

🏆 Finalidade

Este projeto foi desenvolvido como parte do desafio técnico Tamborine, com foco em:

  código limpo

  arquitetura organizada

  API segura

  UI clara e intuitiva

  automação de testes

  boas práticas de TypeScript