import type { ICategory } from "./CategoryInterface";
import type { IOption } from "./GenInterface";
import type { IItem } from "./ItemInterface";

export interface IInventory {
  warehouse_id: string;
  quantity: number;
  purchase_price: number;
  sale_price: number;
  id: number;
  updated_at: string;
  item: IItem
}

export interface IInventoryGrouped { 
  item_id: number;
  inventory_id: number;
  item_name: string;
  total_quantity: number;
  total_investment: number;
  warehouse_id: number;
  category_id: number;

  last_sale_price?: number;
  last_purchase_price?: number;
}

export interface IInventoryMovements {
  item_id: number; 
  item_name: string;

  quantity: number;
  purchase_price: number;
  sale_price: number;

  [key: string]: string | number;
}


export interface IInventorySlice {
  listItemByInventory: IOption[];
  itemRecentCreated: IItem | null;

  listItemGloabl: IInventoryGrouped[];
  listItemFiltered: IInventoryGrouped[];
  listCategoryByInventory: ICategory[];

  warehouseFilterId: number;
  categoryFilterId: number;
  orderDirection: "asc" | "desc";
}