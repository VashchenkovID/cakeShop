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
    static login(authParams: AuthorizationParams): Promise<AxiosResponse<AuthResponse>>;
    static registration(authParams: AuthorizationParams): Promise<AxiosResponse<AuthResponse>>;
    static logout(): Promise<void>;
}
