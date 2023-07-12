import { browserHistory } from 'src/history/history';
import { storageToken } from '../utils/storage';
// @ts-ignore
const location = import.meta.env.VITE_API_URL;
const buildParamsPostNew = (met, data) => ({
    method: met,
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});
const buildParamsPost = (met, data) => {
    if (data) {
        return {
            method: met,
            headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${storageToken()}`,
            },
            formData: JSON.stringify(data),
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
const buildParamsImagePost = (met, data) => {
    return {
        method: met,
        headers: {
            Authorization: `Bearer ${storageToken()}`,
        },
        body: data,
    };
};
const buildParams = (met) => ({
    method: met,
    headers: { Authorization: `Bearer ${storageToken()}` },
});
const handleResponse = async (res) => {
    const status = String(res.status).substring(0, 1);
    if (status === '2') {
        try {
            return (await res.json());
        }
        catch (e) {
            return {};
        }
    }
    else {
        return Promise.reject(res);
    }
};
const handleError = async (res) => {
    const data = (await res.json());
    const status = String(res.status).substring(0, 1);
    if (res.status === 401) {
        // localStorage.clear();
    }
    else if (res.status === 403) {
        browserHistory.push('/error/403');
    }
    else if (res.status === 404) {
        browserHistory.push('/error/404');
    }
    else if (res.status === 503) {
        browserHistory.push('/error/503');
    }
    else if (status === '5') {
        browserHistory.push('/error/500');
    }
    throw data;
};
export const postNew = (url, data) => fetch(location + url, buildParamsPostNew('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const postIm = (url, data) => fetch(location + url, buildParamsImagePost('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const post = (url, data) => fetch(location + url, buildParamsPost('POST', data))
    .then(handleResponse)
    .catch(handleError);
export const get = (url) => fetch(location + url, buildParams('GET'))
    .then(handleResponse)
    .catch(handleError);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const put = (url) => fetch(location + url, buildParams('PUT'))
    .then(handleResponse)
    .catch(handleError);
export const putData = (url, data) => fetch(location + url, buildParamsPost('PUT', data))
    .then(handleResponse)
    .catch(handleError);
export const del = (url) => fetch(location + url, buildParams('DELETE'))
    .then(handleResponse)
    .catch(handleError);
//# sourceMappingURL=index.js.map