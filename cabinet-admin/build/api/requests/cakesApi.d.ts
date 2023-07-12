import { DeviceListModel } from 'src/api/models/DeviceListModel';
import { AxiosResponse } from 'axios';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import { TypeModel } from 'src/api/models/TypeModel';
import { DecorUserModel } from 'src/api/models/DecorUserModel';
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
    createCake: (data: any) => Promise<string | number>;
    removeCake: (id: string) => Promise<string | number>;
    editCake: (id: string, data: any) => Promise<string | number>;
    loadRecipe: (id: string) => Promise<DeviceItemModel>;
    createCakeType: (name: FormData) => Promise<string | number>;
    getCakeTypes: () => Promise<AxiosResponse<TypeModel[], {
        message: string;
    }>>;
    removeCakeType: (id: number) => Promise<string | number>;
    updateCakeType: (id: number, name: string) => Promise<string | number>;
    createCakeFilling: (data: FormData) => Promise<string | number>;
    getCakeFillings: () => Promise<AxiosResponse<any, any>>;
    removeCakeFilling: (id: number) => Promise<string | number>;
    updateCakeFilling: (id: number, data: FormData) => Promise<string | number>;
    getBiscuits: () => Promise<AxiosResponse<any, any>>;
    createBiscuit: (data: any) => Promise<string | number>;
    updateBiscuit: (id: number, data: any) => Promise<string | number>;
    removeBiscuit: (id: number) => Promise<string | number>;
    getDecorAdmin: () => Promise<AxiosResponse<any, any>>;
    getDecor: () => Promise<AxiosResponse<DecorUserModel[], any>>;
    createDecor: (data: any) => Promise<string | number>;
    updateDecor: (id: number, data: FormData) => Promise<string | number>;
    removeDecor: (id: number) => Promise<string | number>;
};
export default _default;
