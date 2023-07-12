import React from "react";
import { OrderProcessingModel } from "src/api/models/OrderProcessingModel";
interface IComponentProps {
    order: OrderProcessingModel | null;
    isFullLoading: boolean;
    setNull(param: null): void;
    activeOrder?: OrderProcessingModel | null;
    getOrders: (date: string) => void;
    date: Date;
}
declare const AdministrationOrdersViewById: React.FC<IComponentProps>;
export default AdministrationOrdersViewById;
