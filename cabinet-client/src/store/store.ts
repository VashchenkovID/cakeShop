import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";
import basketSlice from "./features/basket/BasketSlice";
import authSlice from "./features/auth/AuthSlice";

const reducer = combineReducers({
  basketSlice,
  authSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: reducer,
  });
};

export const store: Store<RootStateType> = setupStore();

export type RootStateType = ReturnType<typeof reducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatchType = AppStoreType["dispatch"];
