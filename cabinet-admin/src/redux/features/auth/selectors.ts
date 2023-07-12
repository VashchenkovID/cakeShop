import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'src/redux/store';



const selectSelf = (state: RootStateType) => state.userSlice;
// status
export const selectIsAuth = createDraftSafeSelector(
  selectSelf,
  (state) => state.isAuth,
);
