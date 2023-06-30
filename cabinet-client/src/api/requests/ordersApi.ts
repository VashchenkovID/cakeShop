import { AxiosResponse } from "axios";
import { $authHost } from "./index";
import { EnpointsEnum } from "../endpoints";
import { ReqWithPagination } from "src/api/requests/ratingsApi";
import { OrderModel } from "src/api/models/OrderModel";

export default {
  createNewIndividualOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_INDIVIDUAL_ORDER}`, data),
  createNewUserOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_USER_ORDER}`, data),
  getUserOrders: (
    data: ReqWithPagination
  ): Promise<AxiosResponse<{ count: number; rows: OrderModel[] }, any>> =>
    $authHost.get(`${EnpointsEnum.GET_ORDERS}`, { params: data }),
};
