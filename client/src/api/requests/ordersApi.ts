import { AxiosResponse } from 'axios';
import { $authHost } from 'src/api/requests/index';
import { EnpointsEnum } from 'src/api/endpoints';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';

export default {
  createNewIndividualOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_INDIVIDUAL_ORDER}`, data),
  createNewUserOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_USER_ORDER}`, data),
  getOrderProcessing: (
    date: string,
  ): Promise<AxiosResponse<{ items: Array<OrderProcessingModel> }, any>> =>
    $authHost.get(`${EnpointsEnum.GET_PROCESSING}/${date}`),
  updateOrderProcessing: (
    id: string,
    data: { type: string; status: OrderProcessingStatusEnum },
  ): Promise<AxiosResponse<{ message: string }, any>> =>
    $authHost.put(`${EnpointsEnum.UPDATE_PROCESSING_ORDER}/${id}`, data),
};
