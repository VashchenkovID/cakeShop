import { $authHost } from "./index";
export default class AuthService {
    static async login(authParams) {
        return $authHost.post('/user/login', { ...authParams });
    }
    static async registration(authParams) {
        return $authHost.post('/user/registration', {
            ...authParams,
        });
    }
    static async logout() {
        return $authHost.post('/user/logout');
    }
}
//# sourceMappingURL=userAPI.js.map