import React from 'react';
import { AdministrationTypesItemWithImg } from "src/pages/AdministrationTypes/AdministrationTypes";
interface IComponentProps {
    biscuit: {
        name: string;
        img: any;
    };
    setBiscuit: React.Dispatch<React.SetStateAction<AdministrationTypesItemWithImg>>;
    onSave(): Promise<void>;
    onClose(): void;
    title: string;
    isDelete?: boolean;
}
declare const AdministrationTypesModalsBiscuit: React.FC<IComponentProps>;
export default AdministrationTypesModalsBiscuit;
