import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
interface IComponentProps {
    order: OrderProcessingModel;
    activeElement: number | null;
    setActiveElement: React.Dispatch<React.SetStateAction<number | null>>;
}
declare const AdministrationOrdersSideMenuItem: React.FC<IComponentProps>;
export default AdministrationOrdersSideMenuItem;
