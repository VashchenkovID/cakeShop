import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
export const store = setupStore();
//# sourceMappingURL=store.js.map