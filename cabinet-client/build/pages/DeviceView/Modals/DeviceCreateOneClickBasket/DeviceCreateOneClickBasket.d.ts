import React, { SetStateAction } from "react";
import { DeviceModalEnum } from "../../DeviceViewLeftSide/DeviceViewLeftSide";
interface IComponentProps {
    modal: DeviceModalEnum;
    setModal: React.Dispatch<SetStateAction<DeviceModalEnum>>;
    width: number;
}
declare const DeviceCreateOneClickBasket: React.FC<IComponentProps>;
export default DeviceCreateOneClickBasket;
