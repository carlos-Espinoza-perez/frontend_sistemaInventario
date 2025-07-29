// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";

import warehousesReducer from "../features/WarehousesSlice";
import inventoryReducer from "../features/InventorySlice";
import transactionHistoryReducer from "../features/TransactionHistorySlice";
import assistantReducer from "../features/AssistantSlice";

export const store = configureStore({
  reducer: {
    warehouses: warehousesReducer,
    inventory: inventoryReducer,
    transactionHistory: transactionHistoryReducer,
    assistant: assistantReducer
  },
});

// Tipos para TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
