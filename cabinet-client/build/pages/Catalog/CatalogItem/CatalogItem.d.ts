import React from "react";
import { DeviceListModel } from "../../../api/models/DeviceListModel";
interface IComponentProps {
    item: DeviceListModel;
    activeItem?: number | null;
}
declare const CatalogItem: React.FC<IComponentProps>;
export default CatalogItem;
