import axios from 'axios';
import { storageToken } from 'src/utils/storage';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$authHost.defaults.headers.common['Authorization'] = `Bearer ${storageToken()}`;

export { $host, $authHost };
