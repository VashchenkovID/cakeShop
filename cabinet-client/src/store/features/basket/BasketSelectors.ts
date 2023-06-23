import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootStateType } from "../../store";
import { IStoreBasketStateType } from "./BasketSlice";

const selectSelf = (state: RootStateType) => state.basketSlice;
export const selectBasket = createDraftSafeSelector(
  selectSelf,
  (state: IStoreBasketStateType) => state.basket
);
