import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
interface IComponentProps {
    item: OrderProcessingModel;
    index: number;
    setOrders: React.Dispatch<React.SetStateAction<OrderProcessingModel[]>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveElement: React.Dispatch<React.SetStateAction<{
        type: string;
        id: number | null;
    }>>;
}
declare const AdministrationOrdersProcessingCard: React.FC<IComponentProps>;
export default AdministrationOrdersProcessingCard;
