import axios from 'axios';
import { AuthResponse } from 'src/api/requests/userAPI';
import { LocalStorageKeysEnum } from 'src/utils/enum';

const $authHost = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});
$authHost.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    LocalStorageKeysEnum.TOKEN,
  )}`;
  return config;
});

$authHost.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${process.env.REACT_APP_API_URL}/refresh`,
          { withCredentials: true },
        );
        localStorage.setItem('token', response.data.accessToken);
        return $authHost.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  },
);

export { $authHost };
