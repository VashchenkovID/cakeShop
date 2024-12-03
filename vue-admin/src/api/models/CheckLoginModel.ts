export interface CheckLoginResModel {
  isAuth: boolean;
  user: {
    id: number;
    role: string;
    email: string;
    phone: string;
    fullName: string;
    iat: number;
    exp: number;
  } | null;
}
