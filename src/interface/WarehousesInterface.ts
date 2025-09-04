import type { IInventoryGrouped } from "./InventoryInterface";

export interface IWarehouseSlice { 
  listWarehouses: IWarehouse[];
  warehouse: IWarehouse,
  nameFilterWarehouse: string,
  listItemByWarehouse: IInventoryGrouped[]
}

export interface IWarehouse { 
  id: number;
  name: string;
  created_at: string;
  location: string;
}

export interface IFormCreateNewWarehouses {
  name: string;
  location: string;

  [key: string]: string | number;
}