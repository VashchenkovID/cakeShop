import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
interface IComponentProps {
    orders: OrderProcessingModel[];
    activeElement: number | null;
    setActiveElement: React.Dispatch<React.SetStateAction<number | null>>;
}
declare const AdministrationOrdersSideMenu: React.FC<IComponentProps>;
export default AdministrationOrdersSideMenu;
