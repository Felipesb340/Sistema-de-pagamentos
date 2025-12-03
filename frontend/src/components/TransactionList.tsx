import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTransactions } from "../features/transactions/transactionsSlice";

export function TransactionList() {
  const dispatch = useAppDispatch();
  const { items, loadingList, error } = useAppSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = items.length;
    const approved = items.filter((t) => t.status === "approved").length;
    const declined = items.filter((t) => t.status === "declined").length;
    const totalAmount = items.reduce((acc, t) => acc + t.amount, 0);

    return { total, approved, declined, totalAmount };
  }, [items]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-accent">
            Histórico de transações
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-300">
            Acompanhe todas as requisições de autorização feitas pela API.
          </p>
        </div>
        <button
          onClick={() => dispatch(fetchTransactions())}
          className="self-start rounded-lg border border-accent/60 px-3 py-1 text-[11px] font-medium text-accent hover:bg-accent/10 transition"
        >
          Atualizar
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
        <div className="rounded-xl bg-[#11181D] border border-[#26343A] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            Total
          </p>
          <p className="mt-1 text-lg font-semibold">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-[#11181D] border border-accent/50 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            Aprovadas
          </p>
          <p className="mt-1 text-lg font-semibold text-accent">
            {stats.approved}
          </p>
        </div>
        <div className="rounded-xl bg-[#11181D] border border-[#7F1D1D] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            Negadas
          </p>
          <p className="mt-1 text-lg font-semibold text-red-300">
            {stats.declined}
          </p>
        </div>
        <div className="rounded-xl bg-[#11181D] border border-[#26343A] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            Valor total (R$)
          </p>
          <p className="mt-1 text-lg font-semibold">
            {stats.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {loadingList && (
        <p className="text-sm text-accent mt-2">Carregando transações...</p>
      )}
      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}

      {!loadingList && !error && items.length === 0 && (
        <p className="text-sm text-gray-300 mt-2">
          Nenhuma transação registrada ainda. Envie uma transação no painel ao
          lado.
        </p>
      )}

      {!loadingList && !error && items.length > 0 && (
        <div className="relative mt-3 max-h-[380px] overflow-auto rounded-xl border border-[#26343A] bg-[#0D1418]">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[#0A1013] sticky top-0 z-10">
              <tr className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-300">
                <th className="px-3 py-2 text-left">PAN</th>
                <th className="px-3 py-2 text-left">Bandeira</th>
                <th className="px-3 py-2 text-left">Valor</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Autorização</th>
                <th className="px-3 py-2 text-left">Motivo</th>
                <th className="px-3 py-2 text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {items.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-t border-[#26343A] odd:bg-[#11181D] even:bg-[#10171B]"
                >
                  <td className="px-3 py-2 font-mono text-[11px]">
                    {tx.pan}
                  </td>
                  <td className="px-3 py-2">{tx.brand}</td>
                  <td className="px-3 py-2">
                    R${tx.amount.toFixed(2)}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        tx.status === "approved"
                          ? "bg-accent/15 text-accent border border-accent/40"
                          : "bg-red-500/15 text-red-300 border border-red-500/40"
                      }`}
                    >
                      {tx.status === "approved" ? "Aprovada" : "Negada"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[11px]">
                    {tx.authorizationCode || "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-gray-300">
                    {tx.reason || "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-gray-300 whitespace-nowrap">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
