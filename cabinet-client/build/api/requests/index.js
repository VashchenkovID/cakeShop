import axios from "axios";
import { LocalStorageKeysEnum } from "../../utils/enum";
const $host = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
});
const $authHost = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
});
$authHost.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageKeysEnum.TOKEN)}`;
    return config;
});
$authHost.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 &&
        error.config &&
        !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem("token", response.data.accessToken);
            return $authHost.request(originalRequest);
        }
        catch (e) {
            console.log("НЕ АВТОРИЗОВАН");
        }
    }
    throw error;
});
export const converterUrl = (url, data) => {
    // Метод для передачи параметров GET запросом
    const params = Object.entries(data)
        .map((arr) => {
        const result = arr.filter((str) => str !== undefined && str.length !== 0);
        if (result.length > 1) {
            if (Array.isArray(result[1])) {
                return result[1].map((item) => `&${arr[0]}=${item}`).join("");
            }
            return `&${arr.join("=")}`;
        }
        return;
    })
        .filter((str) => str !== undefined);
    return `${url}?${params.join("")}`;
};
export { $host, $authHost };
//# sourceMappingURL=index.js.map