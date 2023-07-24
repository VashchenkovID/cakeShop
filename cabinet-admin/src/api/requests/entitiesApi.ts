import { AxiosResponse } from "axios";
import { EnpointsEnum } from "src/api/endpoints";
import {$authHost} from "src/api/requests/index";

export default {
  getDevices: (): Promise<
    AxiosResponse<{ id: number; name: string }[], { message: string }>
  > => $authHost.get(`${EnpointsEnum.GET_ENT_DEVICE}`),
};
