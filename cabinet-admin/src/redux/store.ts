import { createRouterReducer } from '@lagunovsky/redux-react-router';
import {combineReducers, configureStore, Store} from '@reduxjs/toolkit';
import { browserHistory } from 'src/history/history';
import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';
import userSlice from './features/auth/AuthSlice';
import cakeSlice from 'src/redux/features/cake/CakeSlice';

export const rootReducer:any = combineReducers({
  router: createRouterReducer(browserHistory),
  userSlice,
  cakeSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend().concat(rtkQueryErrorLogger),
  });
};
export const store: Store<RootStateType> = setupStore();


export const subscribe = store.subscribe;

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatchType = AppStoreType['dispatch'];

