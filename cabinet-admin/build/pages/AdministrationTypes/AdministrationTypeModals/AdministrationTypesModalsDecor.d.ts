import React from "react";
import { AdministrationTypesDecorItem } from "src/pages/AdministrationTypes/AdministrationTypes";
interface IComponentProps {
    decor: {
        name: string;
        count: number;
        countType: string;
        pricePerUnit: string;
        constPrice: string;
    };
    setDecor: React.Dispatch<React.SetStateAction<AdministrationTypesDecorItem>>;
    createNewDecor(): Promise<void>;
    onClose(): void;
    title: string;
    isDelete?: boolean;
}
declare const AdministrationTypesModalsDecor: React.FC<IComponentProps>;
export default AdministrationTypesModalsDecor;
