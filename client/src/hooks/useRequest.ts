import { useState } from 'react';

const useRequest = <T extends Array<any>, R>(
  request: (...args: T) => Promise<R>,
  successCallback?: (data?: R) => void,
  errorCallback?: (err?: any) => void,
) => {
  // hook state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<R | null>(null);

  const load = (...args: T) => {
    setIsLoading(true);
    request(...args)
      .then((data) => {
        setData(data);
        setIsSuccess(true);
        successCallback && successCallback(data);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
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
