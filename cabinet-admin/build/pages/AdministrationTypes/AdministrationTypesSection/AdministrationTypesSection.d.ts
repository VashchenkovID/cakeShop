import React from 'react';
import { AdministrationTypesItemsEnum, AdministrationTypesModalEnum } from 'src/pages/AdministrationTypes/AdministrationTypes';
interface IComponentProps {
    title: string;
    items: any[];
    isDecor: boolean;
    onCreate(): void;
    type: AdministrationTypesItemsEnum;
    setEdit(type: AdministrationTypesItemsEnum, item: any): void;
    setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
    clear(): void;
}
declare const AdministrationTypesSection: React.FC<IComponentProps>;
export default AdministrationTypesSection;
