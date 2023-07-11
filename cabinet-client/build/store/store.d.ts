import { Store } from "@reduxjs/toolkit";
declare const reducer: import("redux").Reducer<import("redux").CombinedState<{
    basketSlice: import("./features/basket/BasketSlice").IStoreBasketStateType;
    authSlice: import("./features/auth/types").IAllListsEmployees;
}>, import("redux").AnyAction>;
export declare const setupStore: () => import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").EmptyObject & {
    basketSlice: import("./features/basket/BasketSlice").IStoreBasketStateType;
    authSlice: import("./features/auth/types").IAllListsEmployees;
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<import("redux").CombinedState<{
    basketSlice: import("./features/basket/BasketSlice").IStoreBasketStateType;
    authSlice: import("./features/auth/types").IAllListsEmployees;
}>, import("redux").AnyAction, undefined>]>;
export declare const store: Store<RootStateType>;
export declare type RootStateType = ReturnType<typeof reducer>;
export declare type AppStoreType = ReturnType<typeof setupStore>;
export declare type AppDispatchType = AppStoreType["dispatch"];
export {};
