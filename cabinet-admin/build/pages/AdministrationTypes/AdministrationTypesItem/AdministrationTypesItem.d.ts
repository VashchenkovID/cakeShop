import React from 'react';
import { AdministrationTypesItemsEnum, AdministrationTypesModalEnum } from 'src/pages/AdministrationTypes/AdministrationTypes';
interface IComponentProps {
    item: {
        id: number;
        name: string;
        img?: string;
    };
    type: AdministrationTypesItemsEnum;
    setEdit(type: AdministrationTypesItemsEnum, item: any): void;
    setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
}
declare const AdministrationTypesItem: React.FC<IComponentProps>;
export default AdministrationTypesItem;
