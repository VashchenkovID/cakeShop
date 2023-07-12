import { get } from 'src/api';
import { $authHost } from 'src/api/requests/index';
import { converterUrl } from 'src/utils/functions';
import { toast } from 'react-toastify';
export default {
    loadAllCakes: (data) => $authHost.get(data
        ? `${converterUrl("/device/shop/getAll" /* EnpointsEnum.GET_CAKES */, data)}`
        : "/device/shop/getAll" /* EnpointsEnum.GET_CAKES */),
    loadOneCake: (id) => get(`${"/device/shop/get" /* EnpointsEnum.GET_ONE_CAKE */}/${id}`),
    createCake: (data) => $authHost
        .post("/device/shop/create" /* EnpointsEnum.CREATE_CAKE */, data)
        .then(() => toast.success('Десерт успешно создан')),
    removeCake: (id) => $authHost
        .delete(`${"/device/delete" /* EnpointsEnum.REMOVE_CAKE */}/${id}`)
        .then(() => toast.success('Десерт успешно удален')),
    editCake: (id, data) => $authHost
        .put(`${"/device/shop/update" /* EnpointsEnum.EDIT_CAKE */}/${id}`, data)
        .then(() => toast.success('Десерт успешно сохранен')),
    loadRecipe: (id) => get(`${"/device/shop/admin/getOne" /* EnpointsEnum.GET_RECIPE */}/${id}`),
    //  Вспомогательные типы (начинки и тип десерта, бисквит и декор)
    //Типы
    createCakeType: (name) => $authHost
        .post(`${"/type/create" /* EnpointsEnum.CREATE_TYPE */}`, name)
        .then(() => toast.success('Тип десерта успешно создан')),
    getCakeTypes: () => $authHost.get(`${"/type/getAll" /* EnpointsEnum.GET_TYPES */}`),
    removeCakeType: (id) => $authHost
        .delete(`${"/type/remove" /* EnpointsEnum.DELETE_TYPES */}/${id}`)
        .then(() => toast.success('Тип десерта успешно удален')),
    updateCakeType: (id, name) => $authHost
        .put(`${"/type/update" /* EnpointsEnum.UPDATE_TYPES */}/${id}`, { name: name })
        .then(() => toast.success('Тип десерта успешно сохранен')),
    //Начинки
    createCakeFilling: (data) => $authHost
        .post(`${"/filling/create" /* EnpointsEnum.CREATE_FILLING */}`, data)
        .then(() => toast.success('Начинка успешно создана')),
    getCakeFillings: () => $authHost.get(`${"/filling/getAll" /* EnpointsEnum.GET_FILLINGS */}`),
    removeCakeFilling: (id) => $authHost
        .delete(`${"/filling/remove" /* EnpointsEnum.DELETE_FILLINGS */}/${id}`)
        .then(() => toast.success('Начинка успешно удалена')),
    updateCakeFilling: (id, data) => $authHost
        .put(`${"/filling/update" /* EnpointsEnum.UPDATE_FILLINGS */}/${id}`, data)
        .then(() => toast.success('Начинка успешно сохранена')),
    // Бисквиты
    getBiscuits: () => $authHost.get(`${"/biscuit/getAll" /* EnpointsEnum.GET_BISCUITS */}`),
    createBiscuit: (data) => $authHost
        .post(`${"/biscuit/create" /* EnpointsEnum.CREATE_BISCUIT */}`, data)
        .then(() => toast.success('Бисквит успешно создан')),
    updateBiscuit: (id, data) => $authHost
        .put(`${"/biscuit/update" /* EnpointsEnum.UPDATE_BISCUIT */}/${id}`, data)
        .then(() => toast.success('Бисквит успешно сохранен')),
    removeBiscuit: (id) => $authHost
        .delete(`${"/biscuit/remove" /* EnpointsEnum.DELETE_BISCUIT */}/${id}`)
        .then(() => toast.success('Бисквит успешно удален')),
    //Декор
    getDecorAdmin: () => $authHost.get(`${"/decor/getAllAdmin" /* EnpointsEnum.GET_DECOR_ADMIN */}`),
    getDecor: () => $authHost.get(`${"/decor/getAll" /* EnpointsEnum.GET_DECOR */}`),
    createDecor: (data) => $authHost
        .post(`${"/decor/create" /* EnpointsEnum.CREATE_DECOR */}`, data)
        .then(() => toast.success('Декор успешно создан')),
    updateDecor: (id, data) => $authHost
        .put(`${"/decor/update" /* EnpointsEnum.UPDATE_DECOR */}/${id}`, data)
        .then(() => toast.success('Декор успешно сохранен')),
    removeDecor: (id) => $authHost
        .delete(`${"/decor/delete" /* EnpointsEnum.DELETE_DECOR */}/${id}`)
        .then(() => toast.success('Декор успешно удален')),
};
//# sourceMappingURL=cakesApi.js.map