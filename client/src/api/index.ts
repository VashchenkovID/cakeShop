import { browserHistory } from 'src/history/history';
import { storageToken } from '../utils/storage';

const location: string = process.env.REACT_APP_API_URL;

const buildParamsPostNew = (met: string, data: any) => ({
  method: met,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const buildParamsPost = (met: string, data?: any) => {
  if (data) {
    return {
      method: met,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageToken()}`,
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: met,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storageToken()}`,
    },
  };
};

const buildParamsImagePost = (met: string, data?: any) => {
  return {
    method: met,
    headers: {
      Authorization: `Bearer ${storageToken()}`,
    },
    body: data,
  };
};

const buildParams = (met: string) => ({
  method: met,
  headers: { Authorization: `Bearer ${storageToken()}` },
});

const handleResponse = async (res: any) => {
  const status = String(res.status).substring(0, 1);
  if (status === '2') {
    try {
      return (await res.json()) as Promise<any>;
    } catch (e) {
      return {};
    }
  } else {
    return Promise.reject(res);
  }
};

const handleError = async (res: any) => {
  const data = (await res.json()) as Promise<any>;
  const status = String(res.status).substring(0, 1);
  if (res.status === 401) {
    // localStorage.clear();
  } else if (res.status === 403) {
    browserHistory.push('/error/403');
  } else if (res.status === 404) {
    browserHistory.push('/error/404');
  } else if (res.status === 503) {
    browserHistory.push('/error/503');
  } else if (status === '5') {
    browserHistory.push('/error/500');
  }
  throw data;
};

export const postNew = (url: string, data: any) =>
  fetch(location + url, buildParamsPostNew('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const postIm = (url: string, data?: any) =>
  fetch(location + url, buildParamsImagePost('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const post = (url: string, data?: any) =>
  fetch(location + url, buildParamsPost('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const get = (url: string) =>
  fetch(location + url, buildParams('GET'))
    .then(handleResponse)
    .catch(handleError);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const put = (url: string) =>
  fetch(location + url, buildParams('PUT'))
    .then(handleResponse)
    .catch(handleError);
export const putData = (url: string, data: any) =>
  fetch(location + url, buildParamsPost('PUT', data))
    .then(handleResponse)
    .catch(handleError);
export const del = (url: string) =>
  fetch(location + url, buildParams('DELETE'))
    .then(handleResponse)
    .catch(handleError);
