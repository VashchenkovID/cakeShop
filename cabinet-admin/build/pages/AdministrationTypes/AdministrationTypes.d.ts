import React from 'react';
export declare enum AdministrationTypesModalEnum {
    IDLE = "idle",
    FILLING = "filling",
    TYPE = "type",
    BISCUIT = "biscuit",
    DECOR = "decor",
    TYPE_EDIT = "typeEdit",
    FILLING_EDIT = "fillingEdit",
    BISCUIT_EDIT = "biscuitEdit",
    DECOR_EDIT = "decorEdit",
    TYPE_REMOVE = "typeRemove",
    FILLING_REMOVE = "fillingRemove",
    BISCUIT_REMOVE = "biscuitRemove",
    DECOR_REMOVE = "decorRemove"
}
export declare enum AdministrationTypesItemsEnum {
    TYPE = "type",
    FILLING = "filling",
    BISCUIT = "biscuit",
    DECOR = "decor"
}
export interface AdministrationTypesItemWithImg {
    id: number | null;
    name: string;
    img: any;
}
export interface AdministrationTypesDecorItem {
    id: number | null;
    name: string;
    count: number;
    countType: string;
    pricePerUnit: string;
    constPrice: string;
}
declare const AdministrationTypes: React.FC;
export default AdministrationTypes;
