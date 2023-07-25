import { AxiosResponse } from "axios";
import { $authHost } from "./index";
import { EnpointsEnum } from "../endpoints";
import { ReqWithPagination } from "src/api/requests/ratingsApi";
import { OrderModel } from "src/api/models/OrderModel";
import { toast } from "react-toastify";

export default {
  createNewIndividualOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost
      .post(`${EnpointsEnum.CREATE_INDIVIDUAL_ORDER}`, data)
      .then((res) => {
        toast.success(
          "Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время для уточнения деталей!"
        );
        return res;
      })
      .catch((e) => {
        toast.error("Произошла ошибка при создании заказа");
        return e;
      }),
  createNewUserOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost
      .post(`${EnpointsEnum.CREATE_USER_ORDER}`, data)
      .then((res) => {
        toast.success(
          "Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время для уточнения деталей!"
        );
        return res;
      })
      .catch((e) => {
        toast.error("Произошла ошибка при создании заказа");
        return e;
      }),
  getUserOrders: (
    data: ReqWithPagination
  ): Promise<AxiosResponse<{ count: number; rows: OrderModel[] }, any>> =>
    $authHost.get(`${EnpointsEnum.GET_ORDERS}`, { params: data }),
};
