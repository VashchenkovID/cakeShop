import { createRouterReducer } from '@lagunovsky/redux-react-router';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { browserHistory } from 'src/history/history';
import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';
import userSlice from './features/auth/AuthSlice';
import shopSlice from 'src/redux/features/shop/ShopSlice';
import cakeSlice from 'src/redux/features/cake/CakeSlice';
import basketSlice from 'src/redux/features/basket/BasketSlice';

export const rootReducer = combineReducers({
  router: createRouterReducer(browserHistory),
  userSlice,
  shopSlice,
  cakeSlice,
  basketSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend().concat(rtkQueryErrorLogger),
  });
};

export const store = setupStore();

export const dispatch = store.dispatch;

export const getState = store.getState;

export const subscribe = store.subscribe;

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatchType = AppStoreType['dispatch'];

export const selectSelf = (state: RootStateType) => state;
