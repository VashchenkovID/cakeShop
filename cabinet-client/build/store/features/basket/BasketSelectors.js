import { createDraftSafeSelector } from "@reduxjs/toolkit";
const selectSelf = (state) => state.basketSlice;
export const selectBasket = createDraftSafeSelector(selectSelf, (state) => state.basket);
//# sourceMappingURL=BasketSelectors.js.map