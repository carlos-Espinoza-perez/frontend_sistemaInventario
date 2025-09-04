// src/features/category/categorySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { IInventoryGrouped, IInventorySlice } from "../interface/InventoryInterface";

const initialState: IInventorySlice = {
  listItemByInventory: [],
  listCategoryByInventory: [],
  listItemGloabl: [],
  listItemFiltered: [],
  itemRecentCreated: null,

  warehouseFilterId: 0,
  categoryFilterId: 0,
  orderDirection: "asc", // Default order direction
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setListItemByInventory: (state, action) => {
      state.listItemByInventory = action.payload;
    },

    setListCategoryByInventory: (state, action) => {
      state.listCategoryByInventory = action.payload;
    },

    setListItemGloabl: (state, action) => {
      state.listItemGloabl = action.payload;
      state.listItemFiltered = action.payload; // Initialize filtered items with all items
    },

    setListItemFiltered: (state, action) => {
      const source: IInventoryGrouped[] = action?.payload || state.listItemGloabl;
      const filteredItems = source.filter(item => {
        const matchesWarehouse = state.warehouseFilterId ? item.warehouse_id === state.warehouseFilterId : true;
        const matchesCategory = state.categoryFilterId ? item.category_id === state.categoryFilterId : true;
        return matchesWarehouse && matchesCategory;
      });

      // Ordenar basado en la cantidad total
      filteredItems.sort((a, b) => {
        if (state.orderDirection === "asc") {
          return a.total_quantity - b.total_quantity;
        } else {
          return b.total_quantity - a.total_quantity;
        }
      });

      state.listItemFiltered = filteredItems;
    },    

    setGroupByItemsByItemId: (state) => {
      const filteredItems = state.listItemGloabl.filter(item => {
        const matchesWarehouse = state.warehouseFilterId ? item.warehouse_id === state.warehouseFilterId : true;
        const matchesCategory = state.categoryFilterId ? item.category_id === state.categoryFilterId : true;
        return matchesWarehouse && matchesCategory;
      });

      const groupedItems: Record<number, IInventoryGrouped> = {};
      filteredItems.forEach(item => {
        if (!groupedItems[item.item_id]) {
          groupedItems[item.item_id] = {
            item_id: item.item_id,
            item_name: item.item_name,
            total_quantity: 0,
            total_investment: 0,
            warehouse_id: item.warehouse_id,
            category_id: item.category_id,
            inventory_id: item.inventory_id,
          };
        }
        groupedItems[item.item_id].total_quantity += item.total_quantity;
        groupedItems[item.item_id].total_investment += item.total_investment;
      });

      // Ordenar por total_quantity
      const sortedGroupedItems = Object.values(groupedItems).sort((a, b) =>
        state.orderDirection === "asc" ? a.total_quantity - b.total_quantity : b.total_quantity - a.total_quantity
      );

      state.listItemFiltered = Object.values(sortedGroupedItems);
    },    

    setWarehouseFilterId: (state, action) => {
      state.warehouseFilterId = action.payload;
    },

    setCategoryFilterId: (state, action) => {
      state.categoryFilterId = action.payload;
    },

    toggleOrderDirection: (state) => {
      state.orderDirection = state.orderDirection === "asc" ? "desc" : "asc";
    },

    setItemRecentCreated: (state, action) => {
      state.itemRecentCreated = action.payload;
    },
  },
});

export const {
  setListItemByInventory, setListCategoryByInventory, setListItemGloabl, setListItemFiltered, setWarehouseFilterId,
  setCategoryFilterId, setGroupByItemsByItemId, toggleOrderDirection, setItemRecentCreated
} = inventorySlice.actions;
export default inventorySlice.reducer;
