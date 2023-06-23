import { $authHost } from "./index";
export default {
    createRating: (data) => $authHost.post(`${"/ratings/create" /* EnpointsEnum.CREATE_RATING */}`, data),
    updateRating: (id, data) => $authHost.put(`${"/ratings/update" /* EnpointsEnum.UPDATE_RATINGS */}/${id}`, data),
    removeRating: (id) => $authHost.delete(`${"/ratings/remove" /* EnpointsEnum.DELETE_RATING */}/${id}`),
    getDeviceRatings: (data) => $authHost.get(`${"/ratings/feedback/getDeviceRatings" /* EnpointsEnum.GET_RATINGS_FOR_DEVICE_NOT_USER */}`, {
        params: data,
    }),
    getUserRatings: (data) => $authHost.get(`${("/ratings/getUserRatings" /* EnpointsEnum.GET_USER_RATINGS */, data)}`, { params: data }),
};
//# sourceMappingURL=ratingsApi.js.map