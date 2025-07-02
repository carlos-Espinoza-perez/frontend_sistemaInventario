export interface IFormCreateNewItem {
  name: string;
  code: string;
  description: string;
  category_id: number;

  [key: string]: string | number;
}


export interface IItem {
  code: string;
  name: string;
  description: string;
  category_id: number;
  id: number;
  created_at: string;

  [key: string]: string | number;
}