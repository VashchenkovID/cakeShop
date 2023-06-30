import React from "react";
import { RatingItemModel } from "../../../api/models/RatingItemModel";
interface IComponentProps {
    setPagination: React.Dispatch<React.SetStateAction<{
        page: number;
        limit: number;
    }>>;
    ratings: RatingItemModel[];
    count: number;
    width: number;
    isLoading: boolean;
}
declare const DeviceViewRightSide: React.FC<IComponentProps>;
export default DeviceViewRightSide;
