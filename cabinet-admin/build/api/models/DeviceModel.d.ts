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
    info: DeviceInfoModel[];
}
export interface DeviceInfoModel {
    id: number;
    name: string;
    weight: number;
    weightType: string;
    pricePerUnit: number;
    createdAt: string;
    updatedAt: string;
    deviceId: number;
}
