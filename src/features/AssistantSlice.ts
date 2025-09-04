// src/features/category/categorySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { IAssistantSlice } from "../interface/IAssistantInterface";

const initialState: IAssistantSlice = {
  chatHistory: [],
  isLoading: true, // Se inicializa como true para indicar que el asistente responde primero
};

const assistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    setListChats: (state, action) => {
      state.chatHistory = action.payload;
    },
    addNewChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addNewChatMessage, setIsLoading, setListChats } = assistantSlice.actions;
export default assistantSlice.reducer;
