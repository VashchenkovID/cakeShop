import { $authHost } from 'src/api/requests/index';
import { converterUrl } from 'src/utils/functions';
export default {
    createRating: (data) => $authHost.post(`${"/ratings/create" /* EnpointsEnum.CREATE_RATING */}`, data),
    updateRating: (id, data) => $authHost.put(`${"/ratings/update" /* EnpointsEnum.UPDATE_RATINGS */}/${id}`, data),
    removeRating: (id) => $authHost.delete(`${"/ratings/remove" /* EnpointsEnum.DELETE_RATING */}/${id}`),
    getDeviceRatings: (data) => $authHost.get(`${converterUrl("/ratings/getDeviceRatings" /* EnpointsEnum.GET_RATINGS_FOR_DEVICE */, data)}`),
    getUserRatings: (data) => $authHost.get(`${converterUrl("/ratings/getUserRatings" /* EnpointsEnum.GET_USER_RATINGS */, data)}`),
};
//# sourceMappingURL=ratingsApi.js.map