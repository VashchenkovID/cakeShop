import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectIsAuth } from "src/store/features/auth/selectors";
import axios from "axios";
import { setIsAuth } from "src/store/features/auth/AuthSlice";
import { LocalStorageKeysEnum, PrivateRoutesEnum, PublicRoutesEnum, } from "src/utils/enum";
import { storageToken } from "src/utils/storage";
import AuthContainer from "../../pages/Auth/AuthContainer";
import Catalog from "../../pages/Catalog/Catalog";
import CreateOrder from "../../pages/CreateOrder/CreateOrder";
import { setBasket } from "src/store/features/basket/BasketSlice";
import StartPage from "../../pages/StartPage/StartPage";
import DeviceView from "../../pages/DeviceView/DeviceView";
import Orders from "src/pages/Orders/Orders";
import Feedback from "src/pages/Feedback/Feedback";
export const publicRoutes = [
    { path: `${PublicRoutesEnum.AUTH}`, element: React.createElement(AuthContainer, null) },
    { path: `${PublicRoutesEnum.LOGIN}`, element: React.createElement(AuthContainer, null) },
    { path: `${PublicRoutesEnum.SHOP}`, element: React.createElement(Catalog, null) },
    {
        path: `${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`,
        element: React.createElement(CreateOrder, null),
    },
    { path: `${PublicRoutesEnum.VIEW_DESSERT}/:id`, element: React.createElement(DeviceView, null) },
    { path: `${PublicRoutesEnum.GENERAL}`, element: React.createElement(StartPage, null) },
];
export const privateRoutes = [
    { path: `${PrivateRoutesEnum.MY_ORDERS}`, element: React.createElement(Orders, null) },
    { path: `${PrivateRoutesEnum.MY_FEEDBACK}`, element: React.createElement(Feedback, null) },
];
const AppRouter = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const basket = localStorage.getItem("Basket");
    const checkIsAuth = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}${"/user/refresh" /* EnpointsEnum.CHECK_USER */}`, { withCredentials: true });
            localStorage.setItem(LocalStorageKeysEnum.TOKEN, response.data.accessToken);
            localStorage.setItem(LocalStorageKeysEnum.USER, JSON.stringify(response.data.user));
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
        if (storageToken() || storageToken() !== "undefined") {
            checkIsAuth();
        }
    }, []);
    useEffect(() => {
        if (basket && JSON.parse(basket)) {
            dispatch(setBasket(JSON.parse(basket)));
        }
    }, [basket]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            getRoutes(publicRoutes),
            React.createElement(Route, { path: "/", element: React.createElement(Navigate, { to: PublicRoutesEnum.SHOP, replace: true }) }),
            isAuth && getRoutes(privateRoutes),
            React.createElement(Route, { path: "*", element: React.createElement("div", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430") }))));
};
export default React.memo(AppRouter);
//# sourceMappingURL=AppRouter.js.map