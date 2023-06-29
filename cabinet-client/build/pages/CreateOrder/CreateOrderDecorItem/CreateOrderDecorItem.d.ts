import React from "react";
import { OrderBasketChangeDecors } from "../CreateOrderCakeItem/CreateOrderCakeItem";
interface IComponentProps {
    item: OrderBasketChangeDecors;
    setOrderDecors: React.Dispatch<React.SetStateAction<OrderBasketChangeDecors[]>>;
    index: number;
    parentId: string;
}
declare const CreateOrderDecorItem: React.FC<IComponentProps>;
export default CreateOrderDecorItem;
