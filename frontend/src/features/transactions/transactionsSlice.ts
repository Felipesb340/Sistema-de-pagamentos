import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Transaction, CreateTransactionDTO } from "./types";
import { apiCreateTransaction, apiGetTransactions } from "../../services/api";
import axios from "axios";
import type { AxiosError } from "axios";

export interface TransactionsState {
  items: Transaction[];
  loadingList: boolean;
  loadingCreate: boolean;
  error: string | null;
  lastCreated: Transaction | null;
}

const initialState: TransactionsState = {
  items: [],
  loadingList: false,
  loadingCreate: false,
  error: null,
  lastCreated: null,
};

// thunk para listar transações
export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>("transactions/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await apiGetTransactions();
    return data;
  } catch (err: unknown) {
    console.error(err);
    return rejectWithValue("Erro ao carregar transações.");
  }
});

export const createTransactionThunk = createAsyncThunk<
  Transaction,
  CreateTransactionDTO,
  { rejectValue: string }
>("transactions/create", async (payload, { rejectWithValue }) => {
  try {
    const data = await apiCreateTransaction(payload);
    return data;
  } catch (err: unknown) {
    console.error(err);

    let message = "Erro ao processar a transação. Tente novamente.";

    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const apiMessage = axiosErr.response?.data?.message;
      if (apiMessage) {
        message = apiMessage;
      }
    }

    return rejectWithValue(message);
  }
});

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearLastCreated(state) {
      state.lastCreated = null;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loadingList = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload || "Erro ao carregar transações.";
      });

    builder
      .addCase(createTransactionThunk.pending, (state) => {
        state.loadingCreate = true;
        state.error = null;
      })
      .addCase(
        createTransactionThunk.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loadingCreate = false;
          state.items.unshift(action.payload);
          state.lastCreated = action.payload;
        }
      )
      .addCase(createTransactionThunk.rejected, (state, action) => {
        state.loadingCreate = false;
        state.error =
          action.payload ||
          "Erro ao processar a transação. Tente novamente.";
      });
  },
});

export const { clearLastCreated } = transactionsSlice.actions;
export default transactionsSlice.reducer;
