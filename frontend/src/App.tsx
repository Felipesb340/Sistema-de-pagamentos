import { useAppSelector } from "./app/hooks";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";

function App() {
  const lastCreated = useAppSelector(
    (state) => state.transactions.lastCreated
  );

  return (
    <div className="min-h-screen bg-background text-text">
      {/* NAV / HEADER */}
      <header className="border-b border-[#26343A] bg-[#11181D]/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">

            <div>
              <p className="text-gray-300">
                Simulador de autorização de pagamentos
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-gray-300">
            <span className="px-3 py-1 rounded-full bg-[#1A2429] border border-[#26343A]">
              Backend: <span className="font-semibold text-accent">Fastify + TS</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#1A2429] border border-[#26343A]">
              Front:{" "}
              <span className="font-semibold text-accent">
                React + Redux Toolkit + Hooks
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* HERO / CONTEÚDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section className="grid gap-10 lg:grid-cols-[1.2fr,1.5fr] items-start">
          {/* COLUNA DIREITA – Card de formulário + última transação */}
          <div className="relative">
            {/* “Glow” de fundo, estilo hero Tamborine */}
            <div className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_top,_#A7E97F22,_transparent_60%)]" />

            <div className="relative space-y-5">
              <TransactionForm />

              {lastCreated && (
                <div
                  className={`rounded-xl border p-4 shadow-md bg-[#11181D]/80 border-[#26343A]`}
                >
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-300">
                    Última transação processada
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                        lastCreated.status === "approved"
                          ? "bg-accent/15 text-accent border border-accent/50"
                          : "bg-red-500/15 text-red-300 border border-red-500/50"
                      }`}
                    >
                      {lastCreated.status === "approved"
                        ? "Aprovada"
                        : "Negada"}
                    </span>
                    <span className="text-gray-200 font-mono text-[11px]">
                      {lastCreated.pan}
                    </span>
                    <span className="text-gray-300">
                      R${lastCreated.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-gray-300 space-x-2">
                    <span>Bandeira: {lastCreated.brand}</span>
                    {lastCreated.authorizationCode && (
                      <span>· Código: {lastCreated.authorizationCode}</span>
                    )}
                    {lastCreated.reason && (
                      <span className="text-red-300">
                        · Motivo: {lastCreated.reason}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SEÇÃO HISTÓRICO */}
        <section className="rounded-2xl border border-[#26343A] bg-[#11181D]/80 p-5 shadow-xl">
          <TransactionList />
        </section>
      </main>
    </div>
  );
}

export default App;
