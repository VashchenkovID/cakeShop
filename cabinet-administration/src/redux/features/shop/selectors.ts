import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { selectSelf } from 'src/redux/store';

export const selectShopItems = createDraftSafeSelector(
  selectSelf,
  (state) => state.shopSlice.items,
);

export const selectShopStatus = createDraftSafeSelector(
  selectSelf,
  (state) => state.shopSlice.status,
);
