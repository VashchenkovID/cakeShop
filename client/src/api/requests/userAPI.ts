import { $authHost } from 'src/api/requests/index';
import { AxiosResponse } from 'axios';

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
    authParams: AuthorizationParams,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $authHost.post<any>('/user/login', { ...authParams });
  }

  static async registration(
    authParams: AuthorizationParams,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $authHost.post<AuthResponse>('/user/registration', {
      ...authParams,
    });
  }

  static async logout(): Promise<void> {
    return $authHost.post('/user/logout');
  }
}
