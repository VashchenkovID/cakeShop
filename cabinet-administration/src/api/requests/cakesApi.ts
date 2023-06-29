import { get } from 'src/api';
import { EnpointsEnum } from 'src/api/endpoints';
import { $authHost } from 'src/api/requests/index';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import { AxiosResponse } from 'axios';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import { TypeModel } from 'src/api/models/TypeModel';
import { converterUrl } from 'src/utils/functions';
import { DecorUserModel } from 'src/api/models/DecorUserModel';
import { toast } from 'react-toastify';

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
    $authHost.get(
      data
        ? `${converterUrl(EnpointsEnum.GET_CAKES, data)}`
        : EnpointsEnum.GET_CAKES,
    ),
  loadOneCake: (id: string): Promise<DeviceItemModel> =>
    get(`${EnpointsEnum.GET_ONE_CAKE}/${id}`),
  createCake: (data: any) =>
    $authHost
      .post(EnpointsEnum.CREATE_CAKE, data)
      .then(() => toast.success('Десерт успешно создан')),
  removeCake: (id: string) =>
    $authHost
      .delete(`${EnpointsEnum.REMOVE_CAKE}/${id}`)
      .then(() => toast.success('Десерт успешно удален')),
  editCake: (id: string, data: any) =>
    $authHost
      .put(`${EnpointsEnum.EDIT_CAKE}/${id}`, data)
      .then(() => toast.success('Десерт успешно сохранен')),
  loadRecipe: (id: string): Promise<DeviceItemModel> =>
    get(`${EnpointsEnum.GET_RECIPE}/${id}`),
  //  Вспомогательные типы (начинки и тип десерта, бисквит и декор)
  //Типы
  createCakeType: (name: FormData) =>
    $authHost
      .post(`${EnpointsEnum.CREATE_TYPE}`, name)
      .then(() => toast.success('Тип десерта успешно создан')),
  getCakeTypes: (): Promise<AxiosResponse<TypeModel[], { message: string }>> =>
    $authHost.get(`${EnpointsEnum.GET_TYPES}`),
  removeCakeType: (id: number) =>
    $authHost
      .delete(`${EnpointsEnum.DELETE_TYPES}/${id}`)
      .then(() => toast.success('Тип десерта успешно удален')),
  updateCakeType: (id: number, name: string) =>
    $authHost
      .put(`${EnpointsEnum.UPDATE_TYPES}/${id}`, { name: name })
      .then(() => toast.success('Тип десерта успешно сохранен')),
  //Начинки
  createCakeFilling: (data: FormData) =>
    $authHost
      .post(`${EnpointsEnum.CREATE_FILLING}`, data)
      .then(() => toast.success('Начинка успешно создана')),
  getCakeFillings: () => $authHost.get(`${EnpointsEnum.GET_FILLINGS}`),
  removeCakeFilling: (id: number) =>
    $authHost
      .delete(`${EnpointsEnum.DELETE_FILLINGS}/${id}`)
      .then(() => toast.success('Начинка успешно удалена')),
  updateCakeFilling: (id: number, data: FormData) =>
    $authHost
      .put(`${EnpointsEnum.UPDATE_FILLINGS}/${id}`, data)
      .then(() => toast.success('Начинка успешно сохранена')),
  // Бисквиты
  getBiscuits: () => $authHost.get(`${EnpointsEnum.GET_BISCUITS}`),
  createBiscuit: (data: any) =>
    $authHost
      .post(`${EnpointsEnum.CREATE_BISCUIT}`, data)
      .then(() => toast.success('Бисквит успешно создан')),
  updateBiscuit: (id: number, data: any) =>
    $authHost
      .put(`${EnpointsEnum.UPDATE_BISCUIT}/${id}`, data)
      .then(() => toast.success('Бисквит успешно сохранен')),
  removeBiscuit: (id: number) =>
    $authHost
      .delete(`${EnpointsEnum.DELETE_BISCUIT}/${id}`)
      .then(() => toast.success('Бисквит успешно удален')),
  //Декор
  getDecorAdmin: () => $authHost.get(`${EnpointsEnum.GET_DECOR_ADMIN}`),
  getDecor: (): Promise<AxiosResponse<DecorUserModel[], any>> =>
    $authHost.get(`${EnpointsEnum.GET_DECOR}`),
  createDecor: (data: any) =>
    $authHost
      .post(`${EnpointsEnum.CREATE_DECOR}`, data)
      .then(() => toast.success('Декор успешно создан')),
  updateDecor: (id: number, data: FormData) =>
    $authHost
      .put(`${EnpointsEnum.UPDATE_DECOR}/${id}`, data)
      .then(() => toast.success('Декор успешно сохранен')),
  removeDecor: (id: number) =>
    $authHost
      .delete(`${EnpointsEnum.DELETE_DECOR}/${id}`)
      .then(() => toast.success('Декор успешно удален')),
};
