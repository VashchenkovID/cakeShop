import { AxiosResponse } from 'axios';
import {$authHost} from "./index";
import {EnpointsEnum} from "../endpoints";


export default {
  createNewIndividualOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_INDIVIDUAL_ORDER}`, data),
  createNewUserOrder: (data: any): Promise<AxiosResponse<any, any>> =>
    $authHost.post(`${EnpointsEnum.CREATE_USER_ORDER}`, data),
};
