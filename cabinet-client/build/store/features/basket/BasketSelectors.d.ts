import { IStoreBasketStateType } from "./BasketSlice";
export declare const selectBasket: ((state: import("redux").EmptyObject & {
    basketSlice: IStoreBasketStateType;
    authSlice: import("../auth/types").IAllListsEmployees;
}) => import("../../../api/models/BasketModel").BasketModel | null) & import("reselect").OutputSelectorFields<(args_0: IStoreBasketStateType) => import("../../../api/models/BasketModel").BasketModel | null, {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
