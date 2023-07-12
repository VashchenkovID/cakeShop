import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import { DeviceInfoModel } from 'src/api/models/DeviceModel';
export interface OrderProcessingCraftingModel {
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
    items: OrderProcessingCraftingItemModel[];
    decors: [];
}
export interface OrderProcessingCraftingItemModel {
    id: number;
    name: string;
    count: number;
    price: number;
    countWeightType: number;
    createdAt: string;
    updatedAt: string;
    BasketId: number;
    deviceId: number;
    recipe: OrderProcessingCraftingRecipeModel;
}
export interface OrderProcessingCraftingRecipeModel {
    id: number;
    img: string;
    info: DeviceInfoModel[];
}
