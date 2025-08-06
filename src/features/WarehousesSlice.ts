// src/features/category/categorySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { IWarehouseSlice } from "../interface/WarehousesInterface";

const initialState: IWarehouseSlice = {
  listWarehouses: [],
  warehouse: {
    id: 0,
    name: "",
    created_at: "",
    location: ""
  },
  nameFilterWarehouse: "",
  listItemByWarehouse: []
};

const warehousesSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {
    setListWarehouses: (state, action) => {
      state.listWarehouses = action.payload;
    },

    setWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },

    setListItemByWarehouse: (state, action) => {
      state.listItemByWarehouse = action.payload;
    },

    setNameFilterWarehouse: (state, action) => {
      state.nameFilterWarehouse = action.payload;
    },
  },
});

export const { setListWarehouses, setWarehouse, setListItemByWarehouse, setNameFilterWarehouse } = warehousesSlice.actions;
export default warehousesSlice.reducer;
