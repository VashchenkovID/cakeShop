import { AxiosResponse } from "axios";
import { $authHost } from "./index";
import { EnpointsEnum } from "../endpoints";
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

export default {
  createRating: (
    data: CreateRatingReqBody
  ): Promise<AxiosResponse<{ id: string }, { message: string }>> =>
    $authHost.post(`${EnpointsEnum.CREATE_RATING}`, data),
  updateRating: (
    id: string,
    data: CreateRatingReqBody
  ): Promise<AxiosResponse<{ id: string }, { message: string }>> =>
    $authHost.put(`${EnpointsEnum.UPDATE_RATINGS}/${id}`, data),
  removeRating: (
    id: string
  ): Promise<AxiosResponse<{ id: string }, { message: string }>> =>
    $authHost.delete(`${EnpointsEnum.DELETE_RATING}/${id}`),
  getDeviceRatings: (
    data: GetDeviceRatingsReqType
  ): Promise<
    AxiosResponse<
      { count: number; rows: RatingItemModel[] },
      { message: string }
    >
  > =>
    $authHost.get(`${EnpointsEnum.GET_RATINGS_DEVICE}`, {
      params: data,
    }),
  getUserRatings: (
    data: ReqWithPagination
  ): Promise<AxiosResponse<{count:number;rows:RatingItemModel[]}, { message: string }>> =>
    $authHost.get(EnpointsEnum.GET_USER_RATINGS, { params: data }),
};
