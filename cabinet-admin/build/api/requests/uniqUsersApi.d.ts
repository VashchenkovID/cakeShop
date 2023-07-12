import { AxiosResponse } from 'axios';
import { UniqUsersModel } from 'src/api/models/UniqUsersModel';
declare const _default: {
    loadUniqUsers: (date: string, type: 'month' | 'full') => Promise<AxiosResponse<UniqUsersModel>>;
};
export default _default;
