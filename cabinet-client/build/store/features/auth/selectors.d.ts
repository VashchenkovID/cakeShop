import { IAllListsEmployees } from "./types";
export declare const selectIsAuth: ((state: import("redux").EmptyObject & {
    basketSlice: import("../basket/BasketSlice").IStoreBasketStateType;
    authSlice: IAllListsEmployees;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: IAllListsEmployees) => boolean, {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
