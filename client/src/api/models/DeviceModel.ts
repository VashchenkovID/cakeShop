export interface DeviceModel {
  id: number;
  name: string;
  price: number;
  typeId: number | null;
  rating: number | null;
  img: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  info: any[];
}