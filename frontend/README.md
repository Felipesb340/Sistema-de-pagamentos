🎨 Frontend · Simulador de Autorização de Pagamentos

Aplicação web do desafio técnico Tamborine.
Permite realizar login, enviar transações e visualizar o histórico armazenado no backend protegido por JWT.

🧱 Stack utilizada

React + TypeScript

Vite

Redux Toolkit

Axios com interceptors

Tailwind CSS

Shadcn/UI (componentes estilizados)

🔐 Autenticação JWT

O frontend:

possui tela de login

armazena token no localStorage

envia automaticamente o JWT em todas as requisições via axios.interceptors

redireciona para a tela de login se o usuário não estiver autenticado

inclui botão de logout

🚀 Como rodar
1️⃣ Criar arquivo .env

Crie frontend/.env:

VITE_API_URL=http://localhost:3333


Certifique-se de que o backend está rodando nesta porta.

2️⃣ Instalar dependências
npm install

3️⃣ Rodar o projeto
npm run dev


Aplicação disponível em:

http://localhost:5173

🧭 Fluxo da aplicação

Usuário acessa a tela de login

Faz login via /auth/login

Recebe o token JWT e entra no painel

Pode:

Enviar novas transações

Visualizar histórico

Recarregar lista

Realizar logout

Qualquer rota protegida sem token → redireciona para login

🧩 Estrutura de diretórios
src/
  app/
    hooks.ts
    store.ts
  components/
    LoginPage.tsx
    TransactionForm.tsx
    TransactionList.tsx
  features/
    auth/
      authSlice.ts
      types.ts
    transactions/
      transactionsSlice.ts
      types.ts
  services/
    api.ts
  App.tsx
  main.tsx

🎨 Estilo e UI

Design inspirado no site da Tamborine

Layout em estilo dark clean

Paleta utilizada:

Elemento	Cor
Fundo	#202B30
Texto	#FDFFFC
Destaques	#A7E97F
Containers	#11181D
Bordas	#26343A

Componentes com:

bordas arredondadas

sombras sutis

animações suaves

utilização de tokens visuais do shadcn/ui

🔌 Comunicação com o Backend

Todas as requisições usam Axios com interceptor:

adiciona automaticamente header:

Authorization: Bearer <token>


trata respostas 401

atualiza erro global no Redux

Endpoints utilizados:

Método	Rota	Descrição
POST	/auth/login	Login e recebimento do token
POST	/transactions	Criação de nova transação
GET	/transactions	Lista todas as transações
🧪 Testes (opcional)

O frontend suporta testes com Vitest ou Jest, mas não são obrigatórios no desafio.

Se quiser adicionar:

npm install -D vitest @testing-library/react