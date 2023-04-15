import { AxiosResponse } from 'axios/index';
import { $authHost } from 'src/api/requests/index';
import { EnpointsEnum } from 'src/api/endpoints';

export default {
  getOrderProcessing: (
    date: string,
  ): Promise<AxiosResponse<{ items: Array<any> }, any>> =>
    $authHost.get(`${EnpointsEnum.GET_POPULAR}/${date}`),
  getSales: (
    date: string,
  ): Promise<AxiosResponse<{ items: Array<any> }, any>> =>
    $authHost.get(`${EnpointsEnum.GET_SALES}/${date}`),
};
