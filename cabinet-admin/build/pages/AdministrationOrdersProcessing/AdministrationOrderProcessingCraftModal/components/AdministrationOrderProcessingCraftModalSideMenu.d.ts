import React from 'react';
import { OrderProcessingCraftingItemModel } from 'src/api/models/OrderProcessingCraftingModel';
interface IComponentProps {
    items: OrderProcessingCraftingItemModel[];
    activeItem: OrderProcessingCraftingItemModel;
    setActiveItem: React.Dispatch<React.SetStateAction<OrderProcessingCraftingItemModel>>;
}
declare const AdministrationOrderProcessingCraftModalSideMenu: React.FC<IComponentProps>;
export default AdministrationOrderProcessingCraftModalSideMenu;
