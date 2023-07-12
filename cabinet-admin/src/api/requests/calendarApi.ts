import { AxiosResponse } from 'axios/index';
import { $authHost } from 'src/api/requests/index';
import { EnpointsEnum } from 'src/api/endpoints';

export default {
  getCalendar: (date: string): Promise<AxiosResponse<any, any>> =>
    $authHost.get(`${EnpointsEnum.GET_CALENDAR}/${date}`),
};
