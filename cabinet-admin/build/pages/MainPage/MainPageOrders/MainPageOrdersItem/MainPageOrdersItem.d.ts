import React from 'react';
import { OrderProcessingModel } from 'src/api/models/OrderProcessingModel';
interface IComponentProps {
    order: OrderProcessingModel;
}
declare const MainPageOrdersItem: React.FC<IComponentProps>;
export default MainPageOrdersItem;
