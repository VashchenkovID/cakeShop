import React from "react";
import { AdministrationTypesDecorItem, AdministrationTypesItemWithImg, AdministrationTypesModalEnum } from "../AdministrationTypes";
interface IComponentProps {
    type: {
        name: string;
    };
    setType: React.Dispatch<React.SetStateAction<{
        id: number | null;
        name: string;
    }>>;
    modal: AdministrationTypesModalEnum;
    setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
    filling: AdministrationTypesItemWithImg;
    setFilling: React.Dispatch<React.SetStateAction<AdministrationTypesItemWithImg>>;
    biscuit: AdministrationTypesItemWithImg;
    setBiscuit: React.Dispatch<React.SetStateAction<AdministrationTypesItemWithImg>>;
    decor: AdministrationTypesDecorItem;
    setDecor: React.Dispatch<React.SetStateAction<AdministrationTypesDecorItem>>;
    types: {
        id: number;
        name: string;
    }[];
    fillings: AdministrationTypesItemWithImg[];
    biscuits: AdministrationTypesItemWithImg[];
    decors: AdministrationTypesDecorItem[];
    createNewType(): Promise<void>;
    updateType(): Promise<void>;
    removeType(): Promise<void>;
    createNewFilling(): Promise<void>;
    updateFilling(): Promise<void>;
    removeFilling(): Promise<void>;
    createNewBiscuit(): Promise<void>;
    updateBiscuit(): Promise<void>;
    removeBiscuit(): Promise<void>;
    createNewDecor(): Promise<void>;
    updateDecor(): Promise<void>;
    removeDecor(): Promise<void>;
}
declare const AdministrationTypesModalList: React.FC<IComponentProps>;
export default AdministrationTypesModalList;
