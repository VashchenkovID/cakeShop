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
  decors: OrderProcessingItemDecorsModel[];
  type: 'unauthorized' | 'custom' | 'history';
  dropId: number;
}
export interface OrderProcessingItemModel {
  id: number;
  name: string;
  count: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  IndividualOrderId: number;
  decors: OrderProcessingItemDecorsModel[];
}
export interface OrderProcessingItemDecorsModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  BasketId: number | null;
  IndividualOrderId: number | null;
  items: OrderProcessungItemDecorsItemModel[];
}
export interface OrderProcessungItemDecorsItemModel {
  id: number;
  name: string;
  count: number;
  countType: string;
  pricePerUnit: number;
  constPrice: number;
  createdAt: string;
  updatedAt: string;
  OrderDecorId: number;
}
