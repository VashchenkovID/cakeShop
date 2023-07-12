import { AxiosResponse } from 'axios';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import { OrderProcessingCraftingModel } from 'src/api/models/OrderProcessingCraftingModel';
declare const _default: {
    createNewIndividualOrder: (data: any) => Promise<AxiosResponse<any, any>>;
    createNewUserOrder: (data: any) => Promise<AxiosResponse<any, any>>;
    getOrderProcessing: (date: string) => Promise<AxiosResponse<{
        items: Array<OrderProcessingModel>;
    }, any>>;
    updateOrderProcessing: (id: string, data: {
        type: string;
        status: OrderProcessingStatusEnum;
    }) => Promise<AxiosResponse<{
        message: string;
    }, any>>;
    getHistory: (date: string) => Promise<AxiosResponse<{
        items: Array<OrderProcessingModel>;
    }, any>>;
    getHistoryOrder: (id: string, type: string) => Promise<AxiosResponse<OrderProcessingModel, any>>;
    getCraftOrder: (id: string, type: string) => Promise<AxiosResponse<{
        order: OrderProcessingCraftingModel;
    }, any>>;
};
export default _default;
