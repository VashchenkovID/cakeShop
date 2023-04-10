import { get, post, del } from '../../api';
import { EnpointsEnum } from 'src/api/endpoints';
import { $authHost, $host } from 'src/api/requests/index';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import { AxiosResponse } from 'axios';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';

interface IDeviceListResponse {
  count: number;
  rows: DeviceListModel[];
}

interface IFillingType {
  name: string;
  img: File;
}

export default {
  loadAllCakes: (): Promise<AxiosResponse<IDeviceListResponse, any>> =>
    $host.get(EnpointsEnum.GET_CAKES),
  loadOneCake: (id: string): Promise<any> =>
    get(`${EnpointsEnum.GET_ONE_CAKE}/${id}`),
  createCake: (data: any) => $authHost.post(EnpointsEnum.CREATE_CAKE, data),
  removeCake: (id: string) => del(`${EnpointsEnum.REMOVE_CAKE}/${id}`),
  editCake: (id: string, data: any) =>
    $authHost.put(`${EnpointsEnum.EDIT_CAKE}/${id}`, data),
  loadRecipe: (id: string): Promise<DeviceItemModel> =>
    get(`${EnpointsEnum.GET_RECIPE}/${id}`),
  //  Вспомогательные типы (начинки и тип десерта)
  createCakeType: (name: FormData) =>
    $authHost.post(`${EnpointsEnum.CREATE_TYPE}`, name),
  getCakeTypes: () => $authHost.get(`${EnpointsEnum.GET_TYPES}`),
  removeCakeType: (id: number) =>
    $authHost.delete(`${EnpointsEnum.DELETE_TYPES}/${id}`),
  createCakeFilling: (data: FormData) =>
    $authHost.post(`${EnpointsEnum.CREATE_FILLING}`, data),
  getCakeFillings: () => $authHost.get(`${EnpointsEnum.GET_FILLINGS}`),
  removeCakeFilling: (id: number) =>
    $authHost.delete(`${EnpointsEnum.DELETE_FILLINGS}/${id}`),
};
