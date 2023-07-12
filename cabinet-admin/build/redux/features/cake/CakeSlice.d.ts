import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
interface ICakeSliceStateType {
    cake: DeviceItemModel | null;
}
export declare const setCake: import("@reduxjs/toolkit").ActionCreatorWithPayload<DeviceItemModel | null, "cakeItem/setCake">;
declare const _default: import("redux").Reducer<ICakeSliceStateType, import("redux").AnyAction>;
export default _default;
