import { AxiosResponse } from "axios";
import { ReqWithPagination } from "src/api/requests/ratingsApi";
import { OrderModel } from "src/api/models/OrderModel";
declare const _default: {
    createNewIndividualOrder: (data: any) => Promise<AxiosResponse<any, any>>;
    createNewUserOrder: (data: any) => Promise<AxiosResponse<any, any>>;
    getUserOrders: (data: ReqWithPagination) => Promise<AxiosResponse<{
        count: number;
        rows: OrderModel[];
    }, any>>;
};
export default _default;
