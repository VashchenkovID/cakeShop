import { $authHost } from 'src/api/requests/index';
export default {
    createNewIndividualOrder: (data) => $authHost.post(`${"/order/create" /* EnpointsEnum.CREATE_INDIVIDUAL_ORDER */}`, data),
    createNewUserOrder: (data) => $authHost.post(`${"/basket/create" /* EnpointsEnum.CREATE_USER_ORDER */}`, data),
    getOrderProcessing: (date) => $authHost.get(`${"/order_processing/getOrders" /* EnpointsEnum.GET_PROCESSING */}/${date}`),
    updateOrderProcessing: (id, data) => $authHost.put(`${"/order_processing/updateOrder" /* EnpointsEnum.UPDATE_PROCESSING_ORDER */}/${id}`, data),
    getHistory: (date) => $authHost.get(`${"/order_processing/getHistory" /* EnpointsEnum.GET_HISTORY */}/${date}`),
    getHistoryOrder: (id, type) => $authHost.get(`${"/order_processing/getHistoryOrder" /* EnpointsEnum.GET_HISTORY_ORDER */}/${type}/${id}`),
    getCraftOrder: (id, type) => $authHost.get(`${"/order_processing/getCraftItems" /* EnpointsEnum.GET_CRAFT_ORDER */}/${type}/${id}`),
};
//# sourceMappingURL=ordersApi.js.map