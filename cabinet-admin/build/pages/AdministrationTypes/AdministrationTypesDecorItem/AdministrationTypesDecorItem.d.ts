import React from 'react';
import { AdministrationTypesItemsEnum, AdministrationTypesModalEnum } from 'src/pages/AdministrationTypes/AdministrationTypes';
interface IComponentProps {
    item: {
        name: string;
        count: number;
        countType: string;
        pricePerUnit: number;
        constPrice: number;
    };
    setEdit(type: AdministrationTypesItemsEnum, item: any): void;
    setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
    type: AdministrationTypesItemsEnum;
}
declare const AdministrationTypesDecorItem: React.FC<IComponentProps>;
export default AdministrationTypesDecorItem;
