declare const useRequest: <T extends any[], R>(request: (...args: T) => Promise<R>, successCallback?: ((data?: R | undefined) => void) | undefined, errorCallback?: ((err?: any) => void) | undefined) => {
    load: (...args: T) => void;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: R | null;
};
export default useRequest;
