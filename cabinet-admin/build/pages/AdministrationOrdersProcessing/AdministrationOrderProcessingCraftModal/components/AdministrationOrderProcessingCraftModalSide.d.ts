import React from 'react';
interface FullCraftItem {
    id: number;
    name: string;
    count: number;
    price: number;
    countWeightType: number;
    createdAt: string;
    updatedAt: string;
    BasketId: number;
    deviceId: number;
    recipe: {
        id: number;
        img: string;
        info: {
            id: number;
            name: string;
            weight: number;
            weightType: string;
            pricePerUnit: number;
            createdAt: string;
            updatedAt: string;
            deviceId: number;
        }[];
    };
    items: {
        id: number;
        name: string;
        weight: number;
        weightType: string;
        pricePerUnit: number;
        createdAt: string;
        updatedAt: string;
        deviceId: number;
    }[];
}
interface IComponentProps {
    activeFullItem: FullCraftItem;
}
declare const AdministrationOrderProcessingCraftModalSide: React.FC<IComponentProps>;
export default AdministrationOrderProcessingCraftModalSide;
