
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {BasketModel} from "../../../api/models/BasketModel";

export interface IStoreBasketStateType {
  basket: BasketModel | null;
}

const initialState: IStoreBasketStateType = {
  basket: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<BasketModel | null>) => {
      state.basket = action.payload;
    },
  },
});
export const { setBasket } = basketSlice.actions;
export default basketSlice.reducer;
