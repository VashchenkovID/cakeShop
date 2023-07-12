import React from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.styl';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header as ConstaHeader, HeaderMenu, HeaderModule, } from '@consta/uikit/Header';
import { HeaderIdEnum, LocalStorageKeysEnum } from 'src/utils/enum';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectIsAuth } from 'src/redux/features/auth/selectors';
import { Button } from '@consta/uikit/Button';
import { User } from '@consta/uikit/User';
import AuthService from 'src/api/requests/userAPI';
const cx = cn.bind(styles);
const Header = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem(LocalStorageKeysEnum.NAME);
    const phone = localStorage.getItem(LocalStorageKeysEnum.PHONE);
    const isAuth = useAppSelector(selectIsAuth);
    const myLoc = `/${location.pathname.split('/').slice(1, 2).join('')}`;
    const items = [
        {
            label: 'Главная',
            id: HeaderIdEnum.ADMINISTRATION,
            href: "/administration" /* PrivateRoutesEnum.ADMINISTRATION */,
            active: myLoc === "/administration" /* PrivateRoutesEnum.ADMINISTRATION */,
            onClick: (e) => {
                headerTransition(e, "/administration" /* PrivateRoutesEnum.ADMINISTRATION */);
            },
            permission: [],
            access: true,
        },
        {
            label: 'Аналитика',
            id: HeaderIdEnum.ANALYTICS,
            href: "/analytics" /* PrivateRoutesEnum.ANALYTICS */,
            active: myLoc === "/analytics" /* PrivateRoutesEnum.ANALYTICS */,
            onClick: (e) => {
                headerTransition(e, "/analytics" /* PrivateRoutesEnum.ANALYTICS */);
            },
            permission: [],
            access: true,
        },
        {
            label: 'Календарь',
            id: HeaderIdEnum.CALENDAR,
            href: "/calendar" /* PrivateRoutesEnum.CALENDAR */,
            active: myLoc === "/calendar" /* PrivateRoutesEnum.CALENDAR */,
            onClick: (e) => {
                headerTransition(e, "/calendar" /* PrivateRoutesEnum.CALENDAR */);
            },
            permission: [],
            access: true,
        },
        {
            label: 'Обработка заказов',
            id: HeaderIdEnum.ORDERS,
            href: "/orders" /* PrivateRoutesEnum.ORDERS */,
            active: myLoc === "/orders" /* PrivateRoutesEnum.ORDERS */,
            onClick: (e) => {
                headerTransition(e, "/orders" /* PrivateRoutesEnum.ORDERS */);
            },
            permission: [],
            access: true,
        },
        {
            label: 'История заказов',
            id: HeaderIdEnum.ORDERS_HISTORY,
            href: "/history" /* PrivateRoutesEnum.ORDERS_HISTORY */,
            active: myLoc === "/history" /* PrivateRoutesEnum.ORDERS_HISTORY */,
            onClick: (e) => {
                headerTransition(e, "/history" /* PrivateRoutesEnum.ORDERS_HISTORY */);
            },
            permission: [],
            access: true,
        },
        {
            label: 'Рецепты',
            id: HeaderIdEnum.RECIPES,
            href: "/recipes" /* PrivateRoutesEnum.RECIPES */,
            active: myLoc === "/recipes" /* PrivateRoutesEnum.RECIPES */,
            onClick: (e) => {
                headerTransition(e, "/recipes" /* PrivateRoutesEnum.RECIPES */);
            },
            permission: [],
            access: true,
        },
        {
            label: 'Отзывы',
            id: HeaderIdEnum.FEEDBACK,
            href: "/feedback" /* PrivateRoutesEnum.FEEDBACK */,
            active: myLoc === "/feedback" /* PrivateRoutesEnum.FEEDBACK */,
            onClick: (e) => {
                headerTransition(e, "/feedback" /* PrivateRoutesEnum.FEEDBACK */);
            },
            permission: [],
            access: true,
        },
        {
            label: 'Справочники',
            id: HeaderIdEnum.TYPES,
            href: "/types" /* PrivateRoutesEnum.TYPES */,
            active: myLoc === "/types" /* PrivateRoutesEnum.TYPES */,
            onClick: (e) => {
                headerTransition(e, "/types" /* PrivateRoutesEnum.TYPES */);
            },
            permission: [],
            access: true,
        },
    ];
    const headerTransition = (e, patch) => {
        console.log(myLoc === patch, myLoc, patch);
        e.preventDefault();
        navigate(patch);
    };
    const logoutApp = async () => {
        AuthService.logout().then(() => {
            localStorage.clear();
            dispatch(setIsAuth(false));
            navigate("/login" /* PublicRoutesEnum.LOGIN */);
        });
    };
    return (React.createElement(ConstaHeader, { className: cx(styles.Header, {
            not: myLoc === "/auth" /* PublicRoutesEnum.AUTH */ || myLoc === "/login" /* PublicRoutesEnum.LOGIN */,
        }), leftSide: React.createElement(HeaderModule, null,
            React.createElement("nav", { className: styles.Header__nav },
                React.createElement(HeaderMenu, { items: isAuth ? items : [] }))), rightSide: React.createElement("div", { className: styles.Header__user },
            isAuth && React.createElement(User, { name: user || '', size: 'l', info: phone || '' }),
            isAuth ? (React.createElement("div", { className: styles.Header__user },
                React.createElement(Button, { onClick: logoutApp, size: 's', view: 'primary', label: 'Выйти' }))) : (React.createElement("div", { className: styles.buttons },
                React.createElement(Button, { onClick: () => navigate("/login" /* PublicRoutesEnum.LOGIN */), label: 'Вход', size: 's' }),
                React.createElement(Button, { onClick: () => navigate("/auth" /* PublicRoutesEnum.AUTH */), label: 'Регистрация', size: 's' })))) }));
};
export default Header;
//# sourceMappingURL=Header.js.map