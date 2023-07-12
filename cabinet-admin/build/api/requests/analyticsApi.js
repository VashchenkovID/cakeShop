import { $authHost } from 'src/api/requests/index';
export default {
    getOrderProcessing: (date) => $authHost.get(`${"/analytics/getPopularity" /* EnpointsEnum.GET_POPULAR */}/${date}`),
    getSales: (date) => $authHost.get(`${"/analytics/getSales" /* EnpointsEnum.GET_SALES */}/${date}`),
};
//# sourceMappingURL=analyticsApi.js.map