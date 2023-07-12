import { $authHost } from 'src/api/requests/index';
export default {
    loadUniqUsers: (date, type) => {
        return $authHost.get(`${"/uniqUsers/users" /* EnpointsEnum.GET_UNIQ_USERS */}/${date}/${type}`);
    },
};
//# sourceMappingURL=uniqUsersApi.js.map