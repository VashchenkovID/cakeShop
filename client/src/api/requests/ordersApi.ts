import { AxiosResponse } from 'axios';
import { $authHost } from 'src/api/requests/index';
import { EnpointsEnum } from 'src/api/endpoints';

export default {
  createNewIndividualOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_INDIVIDUAL_ORDER}`, data),
  createNewUserOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_USER_ORDER}`, data),
};
