export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<import("redux").CombinedState<{
    basketSlice: import("../store/features/basket/BasketSlice").IStoreBasketStateType;
    authSlice: import("../store/features/auth/types").IAllListsEmployees;
}>, undefined, import("redux").AnyAction> & import("redux").Dispatch<import("redux").AnyAction>;
