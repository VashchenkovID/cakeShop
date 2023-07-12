import React from "react";
import { OrderProcessingModel } from "src/api/models/OrderProcessingModel";
interface IComponentProps {
    onClose(): void;
    order: OrderProcessingModel | null;
}
declare const AdministrationOrderModal: React.FC<IComponentProps>;
export default AdministrationOrderModal;
