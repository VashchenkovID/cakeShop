import React, { useMemo, useState } from 'react';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './Auth.module.styl';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import PhoneInput from 'react-phone-input-2';
import { Button } from '@consta/uikit/Button';
import AuthService from 'src/api/requests/userAPI';
import { toast } from 'react-toastify';
const AuthContainer = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const clearInputs = () => {
        setLogin('');
        setPassword('');
    };
    const enterInApp = async () => {
        if (location.pathname.includes("/auth" /* PublicRoutesEnum.AUTH */)) {
            setLoading(true);
            await AuthService.registration({
                email: login,
                password: password,
                fullName: name,
                phone: phone,
            })
                .then((r) => {
                dispatch(setIsAuth(true));
                localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.data.accessToken);
                localStorage.setItem(LocalStorageKeysEnum.ROLE, r.data.user.role);
                localStorage.setItem(LocalStorageKeysEnum.NAME, r.data.user.name);
                localStorage.setItem(LocalStorageKeysEnum.PHONE, r.data.user.phone);
                localStorage.setItem(LocalStorageKeysEnum.ID, String(r.data.user.id));
                clearInputs();
                setLoading(false);
            })
                .catch((r) => {
                toast.error(r.response.data.message);
                setLoading(false);
            });
        }
        if (location.pathname.includes("/login" /* PublicRoutesEnum.LOGIN */)) {
            setLoading(true);
            await AuthService.login({
                email: login,
                password: password,
            })
                .then(async (r) => {
                dispatch(setIsAuth(true));
                localStorage.setItem(LocalStorageKeysEnum.TOKEN, r.data.accessToken);
                localStorage.setItem(LocalStorageKeysEnum.ROLE, r.data.user.role);
                localStorage.setItem(LocalStorageKeysEnum.NAME, r.data.user.name);
                localStorage.setItem(LocalStorageKeysEnum.PHONE, r.data.user.phone);
                localStorage.setItem(LocalStorageKeysEnum.ID, String(r.data.user.id));
                clearInputs();
                navigate("/administration" /* PrivateRoutesEnum.ADMINISTRATION */);
                setLoading(false);
            })
                .catch((r) => {
                toast.error(r.response.data.message);
                setLoading(false);
            });
        }
    };
    const disabled = useMemo(() => {
        if (location.pathname.includes("/auth" /* PublicRoutesEnum.AUTH */)) {
            return (login === '' ||
                password === '' ||
                name === '' ||
                phone === '' ||
                !login ||
                !password ||
                !name ||
                !phone);
        }
        else
            return login === '' || password === '' || !login || !password;
    }, [location.pathname, login, name, password, phone]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: style.Container },
            React.createElement("div", { className: style.Container__body },
                React.createElement(Text, { size: '3xl', className: style.Container__title }, location.pathname.includes("/auth" /* PublicRoutesEnum.AUTH */)
                    ? 'Регистрация'
                    : 'Авторизация'),
                React.createElement(TextField, { size: 's', label: 'Логин', placeholder: 'Логин', width: 'full', id: "outlined-basic", value: login, onChange: ({ value }) => {
                        setLogin(value || '');
                    } }),
                React.createElement(TextField, { type: 'password', placeholder: 'Пароль', label: 'Пароль', size: 's', width: 'full', id: "outlined-basic", value: password, onChange: ({ value }) => {
                        setPassword(value || '');
                    } }),
                location.pathname.includes("/auth" /* PublicRoutesEnum.AUTH */) && (React.createElement(TextField, { size: 's', width: 'full', placeholder: 'Введите имя', label: 'Имя', value: name, onChange: ({ value }) => {
                        setName(value || '');
                    } })),
                location.pathname.includes("/auth" /* PublicRoutesEnum.AUTH */) && (React.createElement(PhoneInput, { specialLabel: 'Номер телефона', containerClass: style.Container__phoneContainer, inputClass: style.Container__phoneInput, placeholder: 'Введите номер телефона', country: 'ru', value: phone, onChange: (value) => setPhone(value
                        .split('')
                        .map((elem, index) => (index === 0 ? '7' : elem))
                        .join('')) })),
                location.pathname.includes("/login" /* PublicRoutesEnum.LOGIN */) ? (React.createElement(Text, { size: 's', onClick: () => {
                        navigate("/auth" /* PublicRoutesEnum.AUTH */);
                    } }, "\u0415\u0449\u0435 \u043D\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B? \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")) : (React.createElement(Text, { size: 's', onClick: () => {
                        navigate("/login" /* PublicRoutesEnum.LOGIN */);
                    } }, "\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B? \u0412\u043E\u0439\u0442\u0438")),
                React.createElement(Button, { size: 's', width: 'full', onClick: enterInApp, label: 'Вход', view: disabled ? 'ghost' : 'primary', disabled: disabled, loading: loading })))));
};
export default AuthContainer;
//# sourceMappingURL=AuthContainer.js.map