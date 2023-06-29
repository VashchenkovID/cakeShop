import React, { MutableRefObject } from "react";
export interface CreateOrderCakeItemType {
    id: number | null;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
    weightType: string;
    countWeightType: number;
}
declare const useCreateOrderCakeItem: (item: CreateOrderCakeItemType, ref: MutableRefObject<number>) => {
    removeWeightCountInBasket: (e: React.MouseEvent<Element, MouseEvent>, item: {
        id: number;
        name: string;
        deviceId: number;
        basketId: number | null;
        count: number;
        price: number;
        weightType: string;
        countWeightType: number;
        localId: string;
    }) => Promise<void>;
    addWeightCountInBasket: (e: React.MouseEvent<Element, MouseEvent>, item: {
        id: number;
        localId: string;
        name: string;
        deviceId: number;
        basketId: number | null;
        count: number;
        price: number;
        weightType: string;
        countWeightType: number;
    }) => Promise<void>;
};
export default useCreateOrderCakeItem;
