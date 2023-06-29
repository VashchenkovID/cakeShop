import React from "react";
import { DeviceItemModel } from "../../../api/models/DeviceItemModel";
import { GetDeviceRatingsReqType } from "../../../api/requests/ratingsApi";
interface IComponentProps {
    device: DeviceItemModel;
    width: number;
    fetchRatings: (data: GetDeviceRatingsReqType) => void;
    fetchDevice: (id: string) => void;
}
export declare enum DeviceModalEnum {
    IDLE = "idle",
    CREATE_RATING = "create_rating",
    CREATE_BASKET = "create_basket"
}
declare const DeviceViewLeftSide: React.FC<IComponentProps>;
export default DeviceViewLeftSide;
