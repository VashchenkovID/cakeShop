import { get, post, postNew } from '../../api';
import { UserInitResponseType } from '../models/UserInitService';

export interface AuthorizationParams {
  email: string;
  password: string;
}

export default {
  loadUserInit: (): Promise<UserInitResponseType> => get(''),
  loadAuthUser: (auth: any) => post('', auth),
  registrationNewUser: (authParams: AuthorizationParams) =>
    postNew('/user/registration', { ...authParams, role: 'USER' }),
  loginUser: (authParams: AuthorizationParams) =>
    postNew('/user/login', { ...authParams }),
};
