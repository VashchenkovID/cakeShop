import { $authHost } from "./index";
export default {
    createNewIndividualOrder: (data) => $authHost.post(`${"/order/create" /* EnpointsEnum.CREATE_INDIVIDUAL_ORDER */}`, data),
    createNewUserOrder: (data) => $authHost.post(`${"/basket/create" /* EnpointsEnum.CREATE_USER_ORDER */}`, data),
    getUserOrders: (data) => $authHost.get(`${"/basket/getUserOrders" /* EnpointsEnum.GET_ORDERS */}`, { params: data }),
};
//# sourceMappingURL=ordersApi.js.map