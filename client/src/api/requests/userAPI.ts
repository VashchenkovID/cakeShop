import { get, post, postNew } from '../../api';
import { UserInitResponseType } from '../models/UserInitService';
import { $host } from 'src/api/requests/index';

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
    $host.post('/user/login', { ...authParams }),
};
