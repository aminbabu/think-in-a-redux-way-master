import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "./transactionsAPI";

const initialState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  transactions: [],
  editableTransaction: {},
};

// async thunks
export const createTransactionAsync = createAsyncThunk(
  "transactions/createTransaction",
  async (data) => {
    const transaction = await createTransaction(data);

    return transaction;
  }
);

export const getTransactionsAsync = createAsyncThunk(
  "transactions/getTransactions",
  async () => {
    const transactions = await getTransactions();

    return transactions;
  }
);

export const updateTransactionAsync = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, transaction }) => {
    const transactions = await updateTransaction(id, transaction);

    return transactions;
  }
);

export const deleteTransactionAsync = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);

    return transaction;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editTransaction: (state, { payload }) => {
      state.editableTransaction = payload;
    },
    cancelEditTransaction: (state) => {
      state.editableTransaction = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransactionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(createTransactionAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.errMsg = "";
        state.transactions.push(payload);
      })
      .addCase(createTransactionAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = error?.message;
        state.transactions = [];
      })
      .addCase(getTransactionsAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(getTransactionsAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.errMsg = "";
        state.transactions = payload;
      })
      .addCase(getTransactionsAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = error?.message;
        state.transactions = [];
      })
      .addCase(updateTransactionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(updateTransactionAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.errMsg = "";

        // find index of the updateded object
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === payload.id
        );
        state.transactions[index] = payload;
      })
      .addCase(updateTransactionAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = error?.message;
      })
      .addCase(deleteTransactionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, { meta }) => {
        state.isLoading = false;
        state.isError = false;
        state.errMsg = "";
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== meta.arg
        );
      })
      .addCase(deleteTransactionAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = error?.message;
      });
  },
});

export const { editTransaction, cancelEditTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
