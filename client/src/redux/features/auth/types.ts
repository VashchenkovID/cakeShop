import { RequestStatusEnum } from 'src/utils/enum';

export interface IAuthUserData {
  token: string;
  id: string;
  login: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  created_at: string;
  updated_at: string;
  blocked: boolean;
  last_login: string;
}

export interface IAuthUser {
  login: string;
  password: string;
}

export interface IAllListsEmployees {
  entities: IAuthUserData | null;
  status: RequestStatusEnum;
  error: string | null;
  isAuth: boolean;
}
