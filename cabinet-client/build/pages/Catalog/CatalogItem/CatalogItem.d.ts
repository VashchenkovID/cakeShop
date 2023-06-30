import React, { SetStateAction } from "react";
import { DeviceListModel } from "../../../api/models/DeviceListModel";
interface IComponentProps {
    item: DeviceListModel;
    width: number;
    setModal: React.Dispatch<SetStateAction<boolean>>;
}
declare const CatalogItem: React.FC<IComponentProps>;
export default CatalogItem;
