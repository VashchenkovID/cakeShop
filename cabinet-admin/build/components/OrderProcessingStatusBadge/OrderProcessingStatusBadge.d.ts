import React from 'react';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
interface IComponentProps {
    status: OrderProcessingStatusEnum;
}
declare const OrderProcessingStatusBadge: React.FC<IComponentProps>;
export default OrderProcessingStatusBadge;
