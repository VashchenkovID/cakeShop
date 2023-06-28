import { $authHost, $host, converterUrl } from "./index";
import { AxiosResponse } from "axios";

import { DeviceListModel } from "../models/DeviceListModel";
import { EnpointsEnum } from "../endpoints";
import { DeviceItemModel } from "../models/DeviceItemModel";
import { TypeModel } from "../models/TypeModel";
import { DecorUserModel } from "../models/DecorUserModel";

interface IDeviceListResponse {
  count: number;
  rows: DeviceListModel[];
}

export interface CakesReqType {
  limit?: number;
  page?: number;
  typeId?: number;
}

export default {
  loadAllCakes: (
    data?: CakesReqType
  ): Promise<AxiosResponse<IDeviceListResponse, any>> =>
    $host.get(EnpointsEnum.GET_CAKES, { params: data }),
  loadOneCake: (id: string): Promise<AxiosResponse<DeviceItemModel>> =>
    $host.get(`${EnpointsEnum.GET_ONE_CAKE}/${id}`),
  //Типы
  getCakeTypes: (): Promise<AxiosResponse<TypeModel[], any>> =>
    $authHost.get(`${EnpointsEnum.GET_TYPES}`),
  //Начинки
  getCakeFillings: () => $authHost.get(`${EnpointsEnum.GET_FILLINGS}`),
  // Бисквиты
  getBiscuits: () => $authHost.get(`${EnpointsEnum.GET_BISCUITS}`),
  //Декор
  getDecor: (): Promise<AxiosResponse<DecorUserModel[], any>> =>
    $authHost.get(`${EnpointsEnum.GET_DECOR}`),
  //  Стартовая информация
  getStart: (): Promise<AxiosResponse<any>> =>
    $authHost.get(`${EnpointsEnum.GET_START_INFO}`),
};
