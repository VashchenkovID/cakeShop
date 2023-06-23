import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectIsAuth } from "../../store/features/auth/selectors";
import axios from "axios";
import { setIsAuth } from "../../store/features/auth/AuthSlice";
import { LocalStorageKeysEnum, PublicRoutesEnum } from "../../utils/enum";
import { storageToken } from "../../utils/storage";
import AuthContainer from "../../pages/Auth/AuthContainer";
export const publicRoutes = [
    { path: `${PublicRoutesEnum.AUTH}`, element: React.createElement(AuthContainer, null) },
    { path: `${PublicRoutesEnum.LOGIN}`, element: React.createElement(AuthContainer, null) },
];
const AppRouter = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const checkIsAuth = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}${"/user/refresh" /* EnpointsEnum.CHECK_USER */}`, { withCredentials: true });
            localStorage.setItem(LocalStorageKeysEnum.TOKEN, response.data.accessToken);
            dispatch(setIsAuth(true));
        }
        catch (e) {
            dispatch(setIsAuth(false));
        }
    };
    const getRoutes = (routes) => {
        return routes.map(({ path, element }) => (React.createElement(Route, { key: Array.isArray(path) ? path?.[0] : path, path: path, element: element })));
    };
    useEffect(() => {
        if (storageToken() && storageToken() !== "undefined") {
            checkIsAuth();
        }
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Navigate, { to: PublicRoutesEnum.GENERAL, replace: true }) }),
            getRoutes(publicRoutes),
            React.createElement(Route, { path: "*", element: React.createElement("div", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430") }))));
};
export default AppRouter;
//# sourceMappingURL=AppRouter.js.map