import {OrderProcessingStatusEnum} from "src/components/OrderStatusBadge/OrderStatusBadge";

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
}
