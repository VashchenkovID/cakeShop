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
    countWeightType: number | null;
    weightType: string;
    decors: {
      id: number | null;
      name: string;
      items: {
        id: number | null;
        name: string;
        count: string;
        countType: string;
        price: number;
        constPrice: number;
      }[];
    }[];
  }[];
}
