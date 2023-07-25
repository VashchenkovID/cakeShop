import { AxiosResponse } from "axios";
import { $authHost } from "./index";
import { EnpointsEnum } from "../endpoints";
import { RatingItemModel } from "../models/RatingItemModel";
import { toast } from "react-toastify";

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
    $authHost
      .post(`${EnpointsEnum.CREATE_RATING}`, data)
      .then((res) => {
        toast.success("Большое спасибо за оставленный отзыв!");
        return res;
      })
      .catch((e) => {
        toast.error("Произошла ошибка при создании отзыва");
        return e;
      }),
  updateRating: (
    id: string,
    data: CreateRatingReqBody
  ): Promise<AxiosResponse<{ id: string }, { message: string }>> =>
    $authHost
      .put(`${EnpointsEnum.UPDATE_RATINGS}/${id}`, data)
      .then((res) => {
        toast.success("Изменения сохранены");
        return res;
      })
      .catch((e) => {
        toast.error("Произошла ошибка при редактировании отзыва");
        return e;
      }),
  removeRating: (
    id: string
  ): Promise<AxiosResponse<{ id: string }, { message: string }>> =>
    $authHost
      .delete(`${EnpointsEnum.DELETE_RATING}/${id}`)
      .then((res) => {
        toast.success("Отзыв успешно удален!");
        return res;
      })
      .catch((e) => {
        toast.error("Произошла ошибка при удалении отзыва");
        return e;
      }),
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
  ): Promise<
    AxiosResponse<
      { count: number; rows: RatingItemModel[] },
      { message: string }
    >
  > => $authHost.get(EnpointsEnum.GET_USER_RATINGS, { params: data }),
};
