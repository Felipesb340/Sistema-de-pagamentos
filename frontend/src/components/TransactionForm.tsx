import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createTransactionThunk } from "../features/transactions/transactionsSlice";
import type { CreateTransactionDTO } from "../features/transactions/types";

const BRANDS = ["Visa", "Mastercard", "Elo", "Amex"] as const;

export function TransactionForm() {
  const dispatch = useAppDispatch();
  const loadingCreate = useAppSelector((s) => s.transactions.loadingCreate);
  const apiError = useAppSelector((s) => s.transactions.error);

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
      setLocalError("O PAN deve conter 16 dígitos numéricos.");
      return;
    }
    if (!form.brand) {
      setLocalError("Selecione uma bandeira.");
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
      //erro cai no slicer
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="
          bg-[#11181D] 
          border border-[#26343A]
          rounded-2xl 
          p-8 
          shadow-xl
          space-y-6
        "
      >
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-[#A7E97F]">
            Simular Transação
          </h2>
          <p className="text-xs text-gray-300">
            Preencha os dados do cartão e o valor desejado.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">PAN (16 dígitos)</label>
            <input
              name="pan"
              value={form.pan}
              onChange={handleChange}
              maxLength={16}
              placeholder="4111111111111111"
              className="
                px-3 py-2 
                rounded-lg 
                bg-[#1A2429] 
                text-[#ffffff]
                border border-transparent
                focus:border-[#A7E97F]
                focus:outline-none
                focus:ring-1 focus:ring-[#A7E97F]/60
              "
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-200">Bandeira</label>
              <select
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="
                  px-3 py-2 
                  rounded-lg 
                  bg-[#1A2429] 
                  text-[#ffffff]
                  border border-transparent
                  focus:border-[#A7E97F]
                  focus:outline-none
                  focus:ring-1 focus:ring-[#A7E97F]/60
                "
              >
                <option value="">Selecione</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-200">Valor (R$)</label>
              <input
                name="amount"
                type="number"
                min={0}
                step={0.01}
                value={form.amount || ""}
                onChange={handleChange}
                placeholder="500"
                className="
                  px-3 py-2 
                  rounded-lg 
                  bg-[#1A2429] 
                  text-[#ffffff]
                  border border-transparent
                  focus:border-[#A7E97F]
                  focus:outline-none
                  focus:ring-1 focus:ring-[#A7E97F]/60
                "
              />
            </div>
          </div>
        </div>

        {(localError || apiError) && (
          <div className="text-[#FF6B6B] text-sm border border-red-500/50 bg-red-500/10 p-2 rounded-lg">
            {localError || apiError}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loadingCreate}
            className="
              bg-[#A7E97F] 
              text-[#11181D] 
              font-semibold 
              px-5 py-2 
              rounded-lg
              hover:brightness-110
              active:scale-95 
              transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loadingCreate ? "Processando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
