import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';

export interface OrderProcessingModel {
  id: number;
  name: string;
  order?: number;
  status: OrderProcessingStatusEnum;
  date_completed: string;
  customer: string;
  customer_phone: string;
  customer_email: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderProcessingItemModel[];
  type: 'unauthorized' | 'custom' | 'history';
}
export interface OrderProcessingItemModel {
  id: number;
  name: string;
  count: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  IndividualOrderId: number;
}
