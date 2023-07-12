import { RootStateType } from 'src/redux/store';
import { RequestStatusEnum } from 'src/utils/enum';
export declare const useRequestStatus: (selector: (state: RootStateType) => RequestStatusEnum) => {
    loaded: boolean;
    pending: boolean;
    idle: boolean;
    rejected: boolean;
};
