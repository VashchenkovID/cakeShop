import { AxiosResponse } from 'axios';
import { $authHost } from 'src/api/requests/index';
import { EnpointsEnum } from 'src/api/endpoints';
import { UniqUsersModel } from 'src/api/models/UniqUsersModel';

export default {
  loadUniqUsers: (
    date: string,
    type: 'month' | 'full',
  ): Promise<AxiosResponse<UniqUsersModel>> => {
    return $authHost.get(`${EnpointsEnum.GET_UNIQ_USERS}/${date}/${type}`);
  },
};
