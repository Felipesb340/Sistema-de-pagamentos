# API de Autorização de Pagamentos

Backend do desafio técnico Tamborine.  
Responsável por receber requisições de transação, aplicar regras e persistir o resultado.

---

## 🧱 Stack

- Node.js + TypeScript
- Fastify
- MongoDB + Mongoose
- Jest + Supertest

---

## 🚀 Como rodar

### 1. Configurar `.env`

Crie um arquivo `.env` em `backend/` com:

```
MONGO_URI=mongodb://localhost:27017/tamborine-payments
PORT=3333
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em desenvolvimento
```bash
npm run dev
```

A API ficará disponível em:
```
http://localhost:3333
```

---

## 📡 Endpoints

### **POST /transactions**

Cria uma nova transação e aplica regras de autorização.

### **GET /transactions**

Retorna todas as transações registradas.

---

## 🧠 Regras de negócio

- PAN deve ter 16 dígitos  
- Bandeiras aceitas: Visa, Mastercard, Elo  
- amount > 0 e <= 1000  
- Aprovada → authorizationCode  
- Negada → reason descrevendo o motivo  
- PAN sempre mascarado

---

## 🧪 Testes

Rodar todos os testes:

```bash
npm test
```

Testes cobrem:

- Serviço `authorizeTransaction`
- Rotas HTTP (`POST` e `GET`)
