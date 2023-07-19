import { AxiosResponse } from "axios";
import { $host } from "src/api/requests/index";
import { EnpointsEnum } from "src/api/endpoints";

export default {
  getDevices: (): Promise<
    AxiosResponse<{ id: number; name: string }[], { message: string }>
  > => $host.get(`${EnpointsEnum.GET_ENT_DEVICE}`),
};
