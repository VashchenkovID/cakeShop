import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootStateType, selectSelf } from 'src/redux/store';

export const selectCakeItem = createDraftSafeSelector(
  selectSelf,
  (state) => state.cakeSlice.cake,
);
