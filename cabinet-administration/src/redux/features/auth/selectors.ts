import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootStateType, selectSelf } from 'src/redux/store';
import { isLoaded, isPending, isRejected, shouldLoad } from 'src/redux/utils';

export const userAuthSelector = (RootStateType: RootStateType) =>
  RootStateType.userSlice.entities;
export const userAuthStatusSelector = (RootStateType: RootStateType) =>
  RootStateType.userSlice.status;

export const userAuthLoadedSelector = isLoaded(userAuthStatusSelector);
export const userAuthRejectedSelector = isRejected(userAuthStatusSelector);
export const usersAuthPendingSelector = isPending(userAuthStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(userAuthStatusSelector);

// status
export const selectIsAuth = createDraftSafeSelector(
  selectSelf,
  (state) => state.userSlice.isAuth,
);
