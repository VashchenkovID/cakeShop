import { BasketModel } from 'src/api/models/BasketModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBasketStateType {
  basket: BasketModel | null;
}

const initialState: IBasketStateType = {
  basket: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<BasketModel>) => {
      state.basket = action.payload;
    },
  },
});
export const { setBasket } = basketSlice.actions;
export default basketSlice.reducer;
