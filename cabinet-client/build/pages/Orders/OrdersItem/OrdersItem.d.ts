import React from "react";
import { OrderModel } from "src/api/models/OrderModel";
interface IComponentProps {
    item: OrderModel;
    width: number;
}
declare const OrdersItem: React.FC<IComponentProps>;
export default OrdersItem;
