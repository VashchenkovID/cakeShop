export interface BasketModel {
  name: string;
  id: number;
  user_id: number;
  items: {
    name: string;
    deviceId: number;
    basketId: number;
    count: number;
    price: number;
  }[];
}
