import React from 'react';
export declare enum OrderProcessingStatusEnum {
    CREATED = "CREATED",
    CONSIDERATION = "CONSIDERATION",
    IN_WORK = "IN_WORK",
    READY = "READY",
    DELIVERY = "DELIVERY",
    COMPLETED = "COMPLETED",
    REJECTED = "REJECTED",
    IDLE = "idle"
}
interface IComponentProps {
    status: OrderProcessingStatusEnum;
}
declare const OrderStatusBadge: React.FC<IComponentProps>;
export default OrderStatusBadge;