import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { selectSelf } from 'src/redux/store';

export const selectBasket = createDraftSafeSelector(
  selectSelf,
  (state) => state.basketSlice.basket,
);
