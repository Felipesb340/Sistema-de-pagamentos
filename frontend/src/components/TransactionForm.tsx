import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createTransactionThunk } from "../features/transactions/transactionsSlice";
import type { CreateTransactionDTO } from "../features/transactions/types";

const BRANDS = ["Visa", "Mastercard", "Elo", "Amex"] as const;

export function TransactionForm() {
  const dispatch = useAppDispatch();
  const loadingCreate = useAppSelector(
    (state) => state.transactions.loadingCreate
  );
  const apiError = useAppSelector((state) => state.transactions.error);

  const [form, setForm] = useState<CreateTransactionDTO>({
    pan: "",
    brand: "",
    amount: 0,
  });

  const [localError, setLocalError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "amount") {
      setForm((prev) => ({ ...prev, amount: Number(value) }));
    } else if (name === "pan") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      setForm((prev) => ({ ...prev, pan: digits }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (!form.pan || form.pan.length !== 16) {
      setLocalError("O PAN deve conter exatamente 16 dígitos numéricos.");
      return;
    }

    if (!form.brand || !BRANDS.includes(form.brand as (typeof BRANDS)[number])) {
      setLocalError("Selecione uma bandeira válida (Visa, Mastercard ou Elo).");
      return;
    }

    if (!form.amount || form.amount <= 0) {
      setLocalError("O valor deve ser maior que zero.");
      return;
    }

    try {
      await dispatch(createTransactionThunk(form)).unwrap();
      setForm({ pan: "", brand: "", amount: 0 });
    } catch {
      // erro já cai em apiError via slice
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl bg-[#11181D]/90 p-6 shadow-xl border border-[#26343A] space-y-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-accent">
            Simular transação
          </h2>
          <p className="text-[11px] text-gray-300">
            Informe os dados do cartão e o valor para testar o fluxo de
            autorização.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <label className="flex flex-col gap-1 text-xs sm:text-sm">
          PAN (16 dígitos)
          <input
            name="pan"
            value={form.pan}
            onChange={handleChange}
            maxLength={16}
            placeholder="4111111111111111"
            className="p-2 rounded-lg bg-[#1A2429] text-text border border-transparent focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/60 text-sm"
          />
          <span className="text-[11px] text-gray-400">
            O número não é armazenado em texto puro, apenas mascarado.
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-xs sm:text-sm">
            Bandeira
            <select
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="p-2 rounded-lg bg-[#1A2429] text-text border border-transparent focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/60 text-sm"
            >
              <option value="">Selecione</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs sm:text-sm">
            Valor (R$)
            <input
              name="amount"
              type="number"
              min={0}
              step={0.01}
              value={form.amount || ""}
              onChange={handleChange}
              className="p-2 rounded-lg bg-[#1A2429] text-text border border-transparent focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/60 text-sm"
              placeholder="Ex: 500"
            />
          </label>
        </div>
      </div>

      {localError && (
        <p className="text-red-400 text-xs">{localError}</p>
      )}
      {apiError && (
        <p className="text-red-400 text-xs">{apiError}</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loadingCreate}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-xs sm:text-sm font-semibold text-background shadow hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingCreate ? "Processando..." : "Enviar transação"}
        </button>
      </div>
    </form>
  );
}
