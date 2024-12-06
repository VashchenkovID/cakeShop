import { AxiosResponse } from "axios";
import { $authHost } from "../index.ts";
import {
  RegistrationUserCreateModel,
  RegistrationUserGetModel,
} from "../models/RegistrationUserModel.ts";
import { CheckLoginResModel } from "../models/CheckLoginModel.ts";
import { LoginUserModel } from "../models/LoginUserModel.ts";

export interface AuthorizationParams {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    role: string;
    name: string;
    phone: string;
    id: number;
  };
}

export default class AuthService {
  static async login(
    authParams: LoginUserModel,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $authHost.post("/user/login", { ...authParams });
  }

  static async registration(
    authParams: RegistrationUserCreateModel,
  ): Promise<AxiosResponse<RegistrationUserGetModel>> {
    return $authHost.post("/user/registration", {
      ...authParams,
    });
  }

  static async logout(token?: string): Promise<void> {
    return $authHost.post("/user/logout", {
      headers: {
        AuthToken: `token: ${token || undefined}`,
      },
    });
  }

  static async checkLogin(
    token?: string,
  ): Promise<AxiosResponse<CheckLoginResModel>> {
    return $authHost.get("/user/checkLogin", {
      headers: {
        AuthToken: `token: ${token || undefined}`,
      },
    });
  }
}
