import { useState } from 'react';
import { toast } from 'react-toastify';
const useRequest = (request, successCallback, errorCallback) => {
    // hook state
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
    const load = (...args) => {
        setIsLoading(true);
        request(...args)
            .then((data) => {
            setData(data);
            setIsSuccess(true);
            successCallback && successCallback(data);
        })
            .catch((err) => {
            setIsError(true);
            toast.error(err.response.data.message);
            errorCallback && errorCallback(err);
        })
            .finally(() => {
            setIsLoading(false);
        });
    };
    return {
        load,
        isLoading,
        isSuccess,
        isError,
        data,
    };
};
export default useRequest;
//# sourceMappingURL=useRequest.js.map