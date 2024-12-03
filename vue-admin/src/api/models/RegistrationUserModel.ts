export interface RegistrationUserCreateModel {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}
export interface RegistrationUserGetModel {
  accessToken: string;
  refreshToken: string;
  user: {
    role: string;
    name: string;
    phone: string;
    id: number;
  };
}
