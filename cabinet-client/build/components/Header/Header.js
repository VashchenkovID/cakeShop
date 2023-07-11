import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./Header.module.styl";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { Header as ConstaHeader, HeaderMenu, HeaderModule, } from "@consta/uikit/Header";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { HeaderIdEnum, PrivateRoutesEnum, PublicRoutesEnum, } from "src/utils/enum";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectIsAuth } from "src/store/features/auth/selectors";
import AuthService from "../../api/requests/userAPI";
import { setIsAuth } from "src/store/features/auth/AuthSlice";
import BasketWithCount from "../BasketWithCount/BasketWithCount";
import { useResize } from "src/hooks/useResize";
import { Sidebar } from "@consta/uikit/Sidebar";
import { IconAlignJustify } from "@consta/uikit/IconAlignJustify";
import { IconClose } from "@consta/uikit/IconClose";
import { Text } from "@consta/uikit/Text";
import FooterWithInfo from "../FooterWithInfo/FooterWithInfo";
import { storageUser } from "src/utils/storage";
const cx = cn.bind(styles);
const Header = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = storageUser();
    const isAuth = useAppSelector(selectIsAuth);
    const myLoc = `/${location.pathname.split("/").slice(1, 2).join("")}`;
    const [isOpen, setIsOpen] = useState(false);
    const { width } = useResize();
    const headerItems = [
        {
            label: "Главная",
            id: HeaderIdEnum.GENERAL,
            href: PublicRoutesEnum.GENERAL,
            active: myLoc === PublicRoutesEnum.GENERAL,
            onClick: (e) => {
                headerTransition(e, PublicRoutesEnum.GENERAL);
            },
            permission: [],
            access: false,
        },
        {
            label: "Каталог",
            id: HeaderIdEnum.SHOP,
            href: PublicRoutesEnum.SHOP,
            active: myLoc === PublicRoutesEnum.SHOP,
            onClick: (e) => {
                headerTransition(e, PublicRoutesEnum.SHOP);
            },
            permission: [],
            access: false,
        },
    ];
    const privateItems = [
        {
            label: "Главная",
            id: HeaderIdEnum.GENERAL,
            href: PublicRoutesEnum.GENERAL,
            active: myLoc === PublicRoutesEnum.GENERAL,
            onClick: (e) => {
                headerTransition(e, PublicRoutesEnum.GENERAL);
            },
            permission: [],
            access: false,
        },
        {
            label: "Каталог",
            id: HeaderIdEnum.SHOP,
            href: PublicRoutesEnum.SHOP,
            active: myLoc === PublicRoutesEnum.SHOP,
            onClick: (e) => {
                headerTransition(e, PublicRoutesEnum.SHOP);
            },
            permission: [],
            access: false,
        },
        {
            label: "Мои заказы",
            id: HeaderIdEnum.MY_ORDERS,
            href: PrivateRoutesEnum.MY_ORDERS,
            active: myLoc === PrivateRoutesEnum.MY_ORDERS,
            onClick: (e) => {
                headerTransition(e, PrivateRoutesEnum.MY_ORDERS);
            },
            permission: [],
            access: false,
        },
        {
            label: "Мои отзывы",
            id: HeaderIdEnum.MY_FEEDBACK,
            href: PrivateRoutesEnum.MY_FEEDBACK,
            active: myLoc === PrivateRoutesEnum.MY_FEEDBACK,
            onClick: (e) => {
                headerTransition(e, PrivateRoutesEnum.MY_FEEDBACK);
            },
            permission: [],
            access: false,
        },
    ];
    const headerTransition = (e, patch) => {
        e.preventDefault();
        navigate(patch);
    };
    const logoutApp = async () => {
        AuthService.logout().then(() => {
            localStorage.clear();
            dispatch(setIsAuth(false));
            setIsOpen(false);
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ConstaHeader, { className: cx(styles.Header, {
                not: myLoc === PublicRoutesEnum.AUTH || myLoc === PublicRoutesEnum.LOGIN,
            }), leftSide: width <= 850 ? (React.createElement("div", null,
                !isOpen && (React.createElement(Button, { iconLeft: isOpen ? IconClose : IconAlignJustify, view: "clear", size: "l", onClick: () => setIsOpen(true) })),
                React.createElement(Sidebar, { style: { width: width - 30 }, className: styles.Sidebar, isOpen: isOpen, position: "left", onClickOutside: () => setIsOpen(false) },
                    React.createElement("div", null,
                        width < 800 && (React.createElement("div", { className: styles.Sidebar__user },
                            isAuth && (React.createElement(User, { name: user?.name || "", size: "l", info: user?.phone || "" })),
                            React.createElement(BasketWithCount, { setIsOpen: setIsOpen }),
                            " ",
                            React.createElement(Button, { iconLeft: isOpen ? IconClose : IconAlignJustify, view: "clear", size: "l", onClick: () => setIsOpen(false) }))),
                        React.createElement("div", { className: styles.Sidebar__links },
                            isAuth
                                ? privateItems.map((item) => (React.createElement(Text, { className: cx(styles.Sidebar__link, {
                                        active: item.active,
                                    }), key: item.id, onClick: (e) => {
                                        setIsOpen(false);
                                        if (item.onClick) {
                                            item.onClick(e);
                                        }
                                    } }, item.label)))
                                : headerItems.map((item) => (React.createElement(Text, { className: cx(styles.Sidebar__link, {
                                        active: item.active,
                                    }), key: item.id, onClick: (e) => {
                                        setIsOpen(false);
                                        if (item.onClick) {
                                            item.onClick(e);
                                        }
                                    } }, item.label))),
                            isAuth ? (React.createElement("div", { className: styles.Header__user },
                                React.createElement(Button, { onClick: logoutApp, size: "s", view: "primary", label: "Выйти" }))) : (React.createElement("div", { className: styles.buttons },
                                React.createElement(Button, { onClick: () => {
                                        setIsOpen(false);
                                        navigate(PublicRoutesEnum.LOGIN);
                                    }, label: "Вход", size: "s" }),
                                React.createElement(Button, { onClick: () => {
                                        setIsOpen(false);
                                        navigate(PublicRoutesEnum.AUTH);
                                    }, label: "Регистрация", size: "s" }))))),
                    React.createElement("div", { className: styles.Sidebar__footer },
                        React.createElement(FooterWithInfo, null))))) : (React.createElement(HeaderModule, { className: styles.Header__left },
                React.createElement("img", { className: styles.Logo, src: logo }),
                React.createElement("nav", { className: styles.Header__nav },
                    isAuth && React.createElement(HeaderMenu, { items: privateItems }),
                    !isAuth && React.createElement(HeaderMenu, { items: headerItems })))), rightSide: width >= 500 ? (React.createElement("div", { className: styles.Header__user },
                isAuth && (React.createElement(User, { name: user?.name || "", size: "l", info: user?.phone || "" })),
                React.createElement(BasketWithCount, null),
                " ",
                isAuth ? (React.createElement("div", { className: styles.Header__user },
                    React.createElement(Button, { onClick: logoutApp, size: "s", view: "primary", label: "Выйти" }))) : (React.createElement("div", { className: styles.buttons },
                    React.createElement(Button, { onClick: () => navigate(PublicRoutesEnum.LOGIN), label: "Вход", size: "s" }),
                    React.createElement(Button, { onClick: () => navigate(PublicRoutesEnum.AUTH), label: "Регистрация", size: "s" }))))) : (React.createElement("img", { className: styles.Logo, src: logo })) })));
};
export default Header;
//# sourceMappingURL=Header.js.map