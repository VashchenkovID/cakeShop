import React from "react";
import { AdministrationTypesItemWithImg } from "src/pages/AdministrationTypes/AdministrationTypes";
interface IComponentProps {
    filling: {
        name: string;
        img: any;
    };
    setFilling: React.Dispatch<React.SetStateAction<AdministrationTypesItemWithImg>>;
    onSave(): Promise<void>;
    onClose(): void;
    title: string;
    isDelete?: boolean;
}
declare const AdministrationTypesModalsFilling: React.FC<IComponentProps>;
export default AdministrationTypesModalsFilling;
