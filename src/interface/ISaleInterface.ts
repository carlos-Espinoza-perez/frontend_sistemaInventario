export interface ISale {
  id: number;
  item_id: number;
  warehouse_id: number;
  user_id: number;
  sale_group_id: number;
  quantity: number;
  sale_price: number;
  paid: boolean;
  note: string | null; // Puede ser un string o nulo
  sold_at: string;     // Se recibe como string en formato ISO 8601
  created_at: string;  // Se recibe como string en formato ISO 8601
  item_name: string;
}