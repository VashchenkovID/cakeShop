import React from "react";
import { GetDeviceRatingsReqType } from "../../../api/requests/ratingsApi";
interface IComponentProps {
    onClose(): void;
    deviceName: string;
    device_id: number;
    width: number;
    fetchRatings: (data: GetDeviceRatingsReqType) => void;
    fetchDevice: (id: string) => void;
}
declare const DeviceCreateRatingModal: React.FC<IComponentProps>;
export default DeviceCreateRatingModal;
