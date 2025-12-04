import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTransactions } from "../features/transactions/transactionsSlice";

const ACCENT_COLOR = "text-[#A7E97F]";
const BORDER_COLOR = "border-[#26343A]";
const BG_CARD_COLOR = "bg-[#11181D]";

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className={`text-base sm:text-lg font-semibold ${ACCENT_COLOR}`}>
            Histórico de Transações
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-300">
            Acompanhe todas as requisições de autorização feitas pela API.
          </p>
        </div>
        <button
          onClick={() => dispatch(fetchTransactions())}
          className={`
            self-start 
            rounded-lg 
            border ${ACCENT_COLOR}/60 
            px-3 py-1 
            text-xs font-medium 
            text-[#030303]
            hover:bg-[#A7E97F]/10 
            transition
          `}
          disabled={loadingList}
        >
          {loadingList ? "Carregando..." : "Atualizar"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
        <div className={`rounded-xl ${BG_CARD_COLOR} border ${BORDER_COLOR} px-4 py-3 shadow text-center`}>
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            Total
          </p>
          <p className="mt-1 text-xl font-bold">{stats.total}</p>
        </div>

        <div className={`rounded-xl ${BG_CARD_COLOR} border border-[#A7E97F]/50 px-4 py-3 shadow text-center`}>
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            Aprovadas
          </p>
          <p className={`mt-1 text-xl font-bold ${ACCENT_COLOR}`}>
            {stats.approved}
          </p>
        </div>

        <div className={`rounded-xl ${BG_CARD_COLOR} border border-[#FF6B6B]/50 px-4 py-3 shadow text-center`}>
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            Negadas
          </p>
          <p className="mt-1 text-xl font-bold text-[#FF6B6B]">
            {stats.declined}
          </p>
        </div>

        <div className={`rounded-xl ${BG_CARD_COLOR} border ${BORDER_COLOR} px-4 py-3 shadow text-center`}>
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            Valor Total (R$)
          </p>
          <p className="mt-1 text-xl font-bold">
            {stats.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {loadingList && (
        <p className={`text-sm ${ACCENT_COLOR} mt-2`}>Carregando transações...</p>
      )}
      {error && (
        <div className="text-[#FF6B6B] text-sm border border-red-500/50 bg-red-500/10 p-2 rounded-lg">
          {error}
        </div>
      )}

      {!loadingList && !error && items.length === 0 && (
        <p className="text-sm text-gray-300 mt-2">
          Nenhuma transação registrada ainda. Envie uma transação no painel ao
          lado.
        </p>
      )}

      {!loadingList && !error && items.length > 0 && (
        <div 
          className="
            relative mt-3 
            max-h-[380px] 
            overflow-auto 
            rounded-xl 
            border ${BORDER_COLOR} 
            bg-[#0D1418] 
            shadow-xl
          "
        >
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-[#0A1013] sticky top-0 z-10 border-b ${BORDER_COLOR}">
              <tr className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-300">
                <th className="px-3 py-3 text-left font-medium">PAN</th>
                <th className="px-3 py-3 text-left font-medium">Bandeira</th>
                <th className="px-3 py-3 text-left font-medium">Valor</th>
                <th className="px-3 py-3 text-left font-medium">Status</th>
                <th className="px-3 py-3 text-left font-medium">Autorização</th>
                <th className="px-3 py-3 text-left font-medium">Motivo</th>
                <th className="px-3 py-3 text-left font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {items.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-t ${BORDER_COLOR} odd:bg-[#131A1F] even:bg-[#101518] hover:bg-[#1A2429] transition duration-150"
                >
                  <td className="px-3 py-2.5 font-mono text-[11px]">
                    {tx.pan}
                  </td>
                  <td className="px-3 py-2.5">{tx.brand}</td>
                  <td className="px-3 py-2.5">
                    R${tx.amount.toFixed(2)}
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        tx.status === "approved"
                          ? "bg-[#A7E97F]/15 text-[#A7E97F] border border-[#A7E97F]/40"
                          : "bg-red-500/15 text-[#FF6B6B] border border-red-500/40"
                      }`}
                    >
                      {tx.status === "approved" ? "Aprovada" : "Negada"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-[11px]">
                    {tx.authorizationCode || "-"}
                  </td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-300">
                    {tx.reason || "-"}
                  </td>
                  <td className="px-3 py-2.5 text-[11px] text-gray-300 whitespace-nowrap">
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