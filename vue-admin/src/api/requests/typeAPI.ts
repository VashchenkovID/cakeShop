import { $authHost } from "../index.ts";
import { EnpointsEnum } from "../endpoints.ts";
import { AxiosResponse } from "axios";
import { TypeCreateModel, TypeModel } from "../models/TypeModel.ts";

export default class TypeService {
  static async createCakeType(name: TypeCreateModel, token?: string) {
    return $authHost.post(`${EnpointsEnum.CREATE_TYPE}`, name, {
      headers: {
        AuthToken: `token: ${token || undefined}`,
      },
    });
  }

  static async getCakeTypes(): Promise<
    AxiosResponse<TypeModel[], { message: string }>
  > {
    return $authHost.get(`${EnpointsEnum.GET_TYPES}`);
  }

  static async removeCakeType(
    id: number,
    token?: string,
  ): Promise<AxiosResponse<{ message: string }>> {
    return $authHost.delete(`${EnpointsEnum.DELETE_TYPES}/${id}`, {
      headers: {
        AuthToken: `token: ${token || undefined}`,
      },
    });
  }

  static async updateCakeType(
    id: number,
    name: string,
  ): Promise<AxiosResponse<TypeModel, { message: string }>> {
    return $authHost.put(`${EnpointsEnum.UPDATE_TYPES}/${id}`, { name: name });
  }
}
