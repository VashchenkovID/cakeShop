import { AxiosResponse } from "axios";
import { DeviceListModel } from "../models/DeviceListModel";
import { DeviceItemModel } from "../models/DeviceItemModel";
import { TypeModel } from "../models/TypeModel";
import { DecorUserModel } from "../models/DecorUserModel";
interface IDeviceListResponse {
    count: number;
    rows: DeviceListModel[];
}
export interface CakesReqType {
    limit?: number;
    page?: number;
    typeId?: number;
}
declare const _default: {
    loadAllCakes: (data?: CakesReqType) => Promise<AxiosResponse<IDeviceListResponse, any>>;
    loadOneCake: (id: string) => Promise<DeviceItemModel>;
    getCakeTypes: () => Promise<AxiosResponse<TypeModel[], any>>;
    getCakeFillings: () => Promise<AxiosResponse<any, any>>;
    getBiscuits: () => Promise<AxiosResponse<any, any>>;
    getDecor: () => Promise<AxiosResponse<DecorUserModel[], any>>;
};
export default _default;
