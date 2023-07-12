import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import { PaginationStateType } from 'src/components/PaginationCustom/PaginationCustom';
interface IComponentProps {
    recipes: DeviceListModel[];
    activeList: number | null;
    setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
    setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
    pagination: PaginationStateType;
    count: number;
}
declare const AdministrationRecipesList: React.FC<IComponentProps>;
export default AdministrationRecipesList;
