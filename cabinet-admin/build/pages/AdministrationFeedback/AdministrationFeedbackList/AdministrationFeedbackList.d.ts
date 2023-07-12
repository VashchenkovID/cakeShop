import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import { PaginationStateType } from 'src/components/PaginationCustom/PaginationCustom';
interface IComponentProps {
    devices: DeviceListModel[];
    count: number;
    pagination: PaginationStateType;
    setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
    isLoading: boolean;
    activeElement: number | null;
    setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
}
declare const AdministrationFeedbackList: React.FC<IComponentProps>;
export default AdministrationFeedbackList;
