import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
interface IComponentProps {
    activeElement: number | null;
    item: DeviceListModel;
    setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
}
declare const AdministrationListItem: React.FC<IComponentProps>;
export default AdministrationListItem;
