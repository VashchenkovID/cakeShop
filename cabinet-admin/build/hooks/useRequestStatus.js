import { useAppSelector } from './useAppSelector';
export const useRequestStatus = (selector) => {
    const status = useAppSelector(selector);
    return {
        loaded: status === "fulfilled" /* RequestStatusEnum.FULFILLED */,
        pending: status === "pending" /* RequestStatusEnum.PENDING */,
        idle: status === "idle" /* RequestStatusEnum.IDLE */,
        rejected: status === "rejected" /* RequestStatusEnum.REJECTED */,
    };
};
//# sourceMappingURL=useRequestStatus.js.map