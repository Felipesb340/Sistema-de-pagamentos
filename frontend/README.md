# Frontend · Simulador de Autorização de Pagamentos

Interface web para envio e visualização de transações.

---

## 🧱 Stack

- Vite + React + TypeScript  
- Redux Toolkit  
- Axios  
- Tailwind CSS  

---

## 🚀 Como rodar

### 1. Criar `.env`

Crie `frontend/.env`:

```
VITE_API_URL=http://localhost:3333
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em desenvolvimento
```bash
npm run dev
```

---

## 🧭 Fluxo

1. Preencher PAN, bandeira e valor  
2. Enviar transação  
3. Visualizar resultado  
4. Histórico atualizado em tempo real  

---

## 📂 Estrutura

```
src/
  app/
  components/
  features/
  services/
  App.tsx
  main.tsx
```

---

## 🎨 Estilo

- Design inspirado no site da Tamborine  
- Paleta personalizada:
  - Fundo: #202B30
  - Texto: #FDFFFC
  - Destaques: #A7E97F
