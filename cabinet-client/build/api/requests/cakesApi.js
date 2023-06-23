import { $authHost, $host } from "./index";
export default {
    loadAllCakes: (data) => $host.get("/device/shop/getAll" /* EnpointsEnum.GET_CAKES */, { params: data }),
    loadOneCake: (id) => $host.get(`${"/device/shop/get" /* EnpointsEnum.GET_ONE_CAKE */}/${id}`),
    //Типы
    getCakeTypes: () => $authHost.get(`${"/type/getAll" /* EnpointsEnum.GET_TYPES */}`),
    //Начинки
    getCakeFillings: () => $authHost.get(`${"/filling/getAll" /* EnpointsEnum.GET_FILLINGS */}`),
    // Бисквиты
    getBiscuits: () => $authHost.get(`${"/biscuit/getAll" /* EnpointsEnum.GET_BISCUITS */}`),
    //Декор
    getDecor: () => $authHost.get(`${"/decor/getAll" /* EnpointsEnum.GET_DECOR */}`),
};
//# sourceMappingURL=cakesApi.js.map