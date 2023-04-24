import { get, del } from '../../api';
import { EnpointsEnum } from 'src/api/endpoints';
import { $authHost, $host } from 'src/api/requests/index';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import { AxiosResponse } from 'axios';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import { TypeModel } from 'src/api/models/TypeModel';
import { converterUrl } from 'src/utils/functions';
import { DecorUserModel } from 'src/api/models/DecorUserModel';

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
    data?: CakesReqType,
  ): Promise<AxiosResponse<IDeviceListResponse, any>> =>
    $host.get(
      data
        ? `${converterUrl(EnpointsEnum.GET_CAKES, data)}`
        : EnpointsEnum.GET_CAKES,
    ),
  loadOneCake: (id: string): Promise<any> =>
    get(`${EnpointsEnum.GET_ONE_CAKE}/${id}`),
  createCake: (data: any) => $authHost.post(EnpointsEnum.CREATE_CAKE, data),
  removeCake: (id: string) => del(`${EnpointsEnum.REMOVE_CAKE}/${id}`),
  editCake: (id: string, data: any) =>
    $authHost.put(`${EnpointsEnum.EDIT_CAKE}/${id}`, data),
  loadRecipe: (id: string): Promise<DeviceItemModel> =>
    get(`${EnpointsEnum.GET_RECIPE}/${id}`),
  //  Вспомогательные типы (начинки и тип десерта, бисквит и декор)
  //Типы
  createCakeType: (name: FormData) =>
    $authHost.post(`${EnpointsEnum.CREATE_TYPE}`, name),
  getCakeTypes: (): Promise<AxiosResponse<TypeModel[], any>> =>
    $authHost.get(`${EnpointsEnum.GET_TYPES}`),
  removeCakeType: (id: number) =>
    $authHost.delete(`${EnpointsEnum.DELETE_TYPES}/${id}`),
  updateCakeType: (id: number, name: string) =>
    $authHost.put(`${EnpointsEnum.UPDATE_TYPES}/${id}`, { name: name }),
  //Начинки
  createCakeFilling: (data: FormData) =>
    $authHost.post(`${EnpointsEnum.CREATE_FILLING}`, data),
  getCakeFillings: () => $authHost.get(`${EnpointsEnum.GET_FILLINGS}`),
  removeCakeFilling: (id: number) =>
    $authHost.delete(`${EnpointsEnum.DELETE_FILLINGS}/${id}`),
  updateCakeFilling: (id: number, data: FormData) =>
    $authHost.put(`${EnpointsEnum.UPDATE_FILLINGS}/${id}`, data),
  // Бисквиты
  getBiscuits: () => $authHost.get(`${EnpointsEnum.GET_BISCUITS}`),
  createBiscuit: (data: any) =>
    $authHost.post(`${EnpointsEnum.CREATE_BISCUIT}`, data),
  updateBiscuit: (id: number, data: any) =>
    $authHost.put(`${EnpointsEnum.UPDATE_BISCUIT}/${id}`, data),
  removeBiscuit: (id: number) =>
    $authHost.delete(`${EnpointsEnum.DELETE_BISCUIT}/${id}`),
  //Декор
  getDecorAdmin: () => $authHost.get(`${EnpointsEnum.GET_DECOR_ADMIN}`),
  getDecor: (): Promise<AxiosResponse<DecorUserModel[], any>> =>
    $authHost.get(`${EnpointsEnum.GET_DECOR}`),
  createDecor: (data: any) =>
    $authHost.post(`${EnpointsEnum.CREATE_DECOR}`, data),
  updateDecor: (id: number, data: FormData) =>
    $authHost.put(`${EnpointsEnum.UPDATE_DECOR}/${id}`, data),
  removeDecor: (id: number) =>
    $authHost.delete(`${EnpointsEnum.DELETE_DECOR}/${id}`),
};
