import { BasketModel } from "../../../api/models/BasketModel";
export interface IStoreBasketStateType {
    basket: BasketModel | null;
}
export declare const setBasket: import("@reduxjs/toolkit").ActionCreatorWithPayload<BasketModel | null, "basket/setBasket">;
declare const _default: import("redux").Reducer<IStoreBasketStateType, import("redux").AnyAction>;
export default _default;
