import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginThunk, restoreSession } from "../features/auth/authSlice";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("teste@teste.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await dispatch(loginThunk({ email, password }));
  }

  return (
    <div className="min-h-screen bg-[#202B30] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-[#0F1519] border border-[#26343A] shadow-2xl px-8 py-8">
        <div className="mb-6 text-center space-y-2">
          <h1 className="text-2xl font-semibold text-[#FDFFFC]">
            Sistema de Pagamentos
          </h1>
          <p className="text-sm text-gray-300">
            Faça login para acessar o simulador de transações.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-xl bg-[#1A2429] border border-transparent px-3 py-2 text-sm text-[#FDFFFC] focus:outline-none focus:border-[#A7E97F] focus:ring-1 focus:ring-[#A7E97F]"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-xl bg-[#1A2429] border border-transparent px-3 py-2 text-sm text-[#FDFFFC] focus:outline-none focus:border-[#A7E97F] focus:ring-1 focus:ring-[#A7E97F]"
              placeholder="********"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-500/40 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#A7E97F] px-4 py-2.5 text-sm font-semibold text-[#202B30] shadow-md hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-[11px] text-gray-400 text-center mt-2">
            Use o usuário cadastrado via API (<code>/auth/register</code>).
          </p>
        </form>
      </div>
    </div>
  );
}
