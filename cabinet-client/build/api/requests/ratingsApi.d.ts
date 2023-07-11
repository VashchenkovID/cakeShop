import { AxiosResponse } from "axios";
import { RatingItemModel } from "../models/RatingItemModel";
export interface CreateRatingReqBody {
    rating: number;
    ratingComment: string;
    device_id: string;
}
export interface ReqWithPagination {
    limit: number;
    page: number;
}
export interface GetDeviceRatingsReqType extends ReqWithPagination {
    device_id: string;
}
declare const _default: {
    createRating: (data: CreateRatingReqBody) => Promise<AxiosResponse<{
        id: string;
    }, {
        message: string;
    }>>;
    updateRating: (id: string, data: CreateRatingReqBody) => Promise<AxiosResponse<{
        id: string;
    }, {
        message: string;
    }>>;
    removeRating: (id: string) => Promise<AxiosResponse<{
        id: string;
    }, {
        message: string;
    }>>;
    getDeviceRatings: (data: GetDeviceRatingsReqType) => Promise<AxiosResponse<{
        count: number;
        rows: RatingItemModel[];
    }, {
        message: string;
    }>>;
    getUserRatings: (data: ReqWithPagination) => Promise<AxiosResponse<{
        count: number;
        rows: RatingItemModel[];
    }, {
        message: string;
    }>>;
};
export default _default;
