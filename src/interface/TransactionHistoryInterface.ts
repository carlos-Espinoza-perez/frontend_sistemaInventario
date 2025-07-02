export interface ITransactionHistorySlice {
  valueTabView: number;
  listTransactionHistoryIn: IAgrupacionMovimiento[]
  listTransactionHistoryOut: IAgrupacionMovimiento[]
}


export interface IItemMovementGroupSaleAndPurchase {
  note: string;
  warehouse_id: number;
  id: number;
  user_id: number;
  created_at: string; // o Date si lo vas a convertir
  total_items: number;

  entry: boolean;
  total_purchase_price: number;
  total_sale_price: number;
  total_debt: number;
}


export interface IAgrupacionMovimiento {
  name: string;
  listMovements: IItemMovementGroupSaleAndPurchase[];
}