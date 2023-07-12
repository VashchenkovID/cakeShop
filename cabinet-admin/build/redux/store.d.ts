import { Store } from '@reduxjs/toolkit';
export declare const rootReducer: any;
export declare const setupStore: () => import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<any, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<any, import("redux").AnyAction, undefined>, import("redux").Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>]>>;
export declare const store: Store<RootStateType>;
export declare const subscribe: (listener: () => void) => import("redux").Unsubscribe;
export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatchType = AppStoreType['dispatch'];
