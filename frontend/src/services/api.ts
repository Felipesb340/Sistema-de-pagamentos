import axios from "axios";
import type { CreateTransactionDTO, Transaction } from "../features/transactions/types";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export async function apiCreateTransaction(
  data: CreateTransactionDTO
): Promise<Transaction> {
  const response = await api.post<Transaction>("/transactions", data);
  return response.data;
}

export async function apiGetTransactions(): Promise<Transaction[]> {
  const response = await api.get<Transaction[]>("/transactions");
  return response.data;
}
