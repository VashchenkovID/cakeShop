import React from "react";
import { DecorUserModel } from "src/api/models/DecorUserModel";
export interface OrderBasketChangeDecors extends DecorUserModel {
    isChecked: boolean;
    localId: string;
}
interface IComponentProps {
    item: {
        id: number;
        localId: string;
        name: string;
        deviceId: number;
        basketId: number | null;
        count: number;
        price: number;
        countWeightType: number;
        weightType: string;
        decors: {
            id: number | null;
            name: string;
            items: {}[];
        }[];
    };
    decors: DecorUserModel[];
    orderDecors: OrderBasketChangeDecors[];
    setOrderDecors: React.Dispatch<React.SetStateAction<OrderBasketChangeDecors[]>>;
}
declare const CreateOrderCakeItem: React.FC<IComponentProps>;
export default CreateOrderCakeItem;
