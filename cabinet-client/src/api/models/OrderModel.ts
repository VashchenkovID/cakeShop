import { OrderProcessingStatusEnum } from "src/components/OrderStatusBadge/OrderStatusBadge";

export interface OrderModel {
  id: number;
  name: string;
  status: OrderProcessingStatusEnum;
  date_completed: string;
  customer: string;
  customer_phone: string;
  customer_email: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  decors: {
    id: number;
    name: string;
    count: string;
    countType: string;
    pricePerUnit: string;
    constPrice: string;
    createdAt: string;
    updatedAt: string;
    DecorId: number | null;
    OrderDecorId: number;
  }[];
  items: {
    id: number;
    name: string;
    count: number;
    price: number;
    countWeightType: number;
    createdAt: string;
    updatedAt: string;
    BasketId: number;
    deviceId: number;
  }[];
}
