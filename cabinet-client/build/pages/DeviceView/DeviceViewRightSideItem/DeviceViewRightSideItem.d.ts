import React from "react";
import { RatingItemModel } from "src/api/models/RatingItemModel";
interface IComponentProps {
    item: RatingItemModel;
    width: number;
}
declare const DeviceViewRightSideItem: React.FC<IComponentProps>;
export default DeviceViewRightSideItem;
