import { DeviceListModel } from 'src/api/models/DeviceListModel';

export interface DeviceItemModel extends DeviceListModel {
  info: {
    id: number;
    name: string;
    weight: string;
    weightType: string;
    pricePerUnit: number;
    createdAt: string;
    updatedAt: string;
    deviceId: number;
  }[];
}
