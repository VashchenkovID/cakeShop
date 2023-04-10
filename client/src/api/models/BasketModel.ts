export interface BasketModel {
  name: string;
  id: number | null;
  user_id: number;
  items: {
    id: number | null;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
  }[];
}
