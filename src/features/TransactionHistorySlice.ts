// src/features/category/categorySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { ITransactionHistorySlice } from "../interface/TransactionHistoryInterface";

const initialState: ITransactionHistorySlice = {
  valueTabView: 0,
  listTransactionHistoryIn: [],
  listTransactionHistoryOut: [],
};

const transactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {
    setValueTabView: (state, action) => {
      state.valueTabView = action.payload;
    },
    setListTransactionHistoryIn: (state, action) => {
      state.listTransactionHistoryIn = action.payload;
    },
    setListTransactionHistoryOut: (state, action) => {
      state.listTransactionHistoryOut = action.payload;
    },
  },
});

export const { setValueTabView, setListTransactionHistoryIn, setListTransactionHistoryOut } = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;
