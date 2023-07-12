import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import AuthContainer from 'src/pages/Auth/AuthContainer';
import { storageToken } from 'src/utils/storage';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';
import MainPage from 'src/pages/MainPage/MainPage';
import axios from 'axios';
import AdministrationRecipes from 'src/pages/AdministrationRecipes/AdministrationRecipes';
import AdministrationRecipesCreate from 'src/pages/AdministrationRecipes/AdministrationRecipesCreate/AdministrationRecipesCreate';
import AdministrationAnalytics from 'src/pages/AdministrationAnalytics/AdministrationAnalytics';
import AdministrationTypes from 'src/pages/AdministrationTypes/AdministrationTypes';
import AdministrationOrders from 'src/pages/AdministrationOrders/AdministrationOrders';
import AdministrationOrdersProcessing from 'src/pages/AdministrationOrdersProcessing/AdministrationOrdersProcessing';
import AdministrationFeedback from 'src/pages/AdministrationFeedback/AdministrationFeedback';
import AdministrationCalendar from 'src/pages/AdministrationCalendar/AdministrationCalendar';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectIsAuth } from 'src/redux/features/auth/selectors';
import PrivateRoute from 'src/components/PrivateRoute';
export const publicRoutes = [
    { path: `${"/auth" /* PublicRoutesEnum.AUTH */}`, element: React.createElement(AuthContainer, null) },
    { path: `${"/login" /* PublicRoutesEnum.LOGIN */}`, element: React.createElement(AuthContainer, null) },
];
export const privateRoutes = [
    {
        path: "/administration" /* PrivateRoutesEnum.ADMINISTRATION */,
        element: React.createElement(MainPage, null),
    },
    {
        path: `${"/recipes" /* PrivateRoutesEnum.RECIPES */}`,
        element: React.createElement(AdministrationRecipes, null),
    },
    {
        path: `${"/create-cake" /* PrivateRoutesEnum.CREATE_CAKE */}`,
        element: React.createElement(AdministrationRecipesCreate, null),
    },
    {
        path: `${"/edit-cake" /* PrivateRoutesEnum.EDIT_CAKE */}/:id`,
        element: React.createElement(AdministrationRecipesCreate, null),
    },
    {
        path: `${"/analytics" /* PrivateRoutesEnum.ANALYTICS */}`,
        element: React.createElement(AdministrationAnalytics, null),
    },
    {
        path: `${"/types" /* PrivateRoutesEnum.TYPES */}`,
        element: React.createElement(AdministrationTypes, null),
    },
    {
        path: `${"/orders" /* PrivateRoutesEnum.ORDERS */}`,
        element: React.createElement(AdministrationOrdersProcessing, null),
    },
    {
        path: `${"/history" /* PrivateRoutesEnum.ORDERS_HISTORY */}`,
        element: React.createElement(AdministrationOrders, null),
    },
    {
        path: `${"/feedback" /* PrivateRoutesEnum.FEEDBACK */}`,
        element: React.createElement(AdministrationFeedback, null),
    },
    {
        path: `${"/calendar" /* PrivateRoutesEnum.CALENDAR */}`,
        element: React.createElement(AdministrationCalendar, null),
    },
];
const AppRouter = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const checkIsAuth = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}${"/user/refresh" /* EnpointsEnum.CHECK_USER */}`, { withCredentials: true });
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
        if (storageToken() && storageToken() !== 'undefined') {
            checkIsAuth();
        }
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(PrivateRoute, null) }),
            React.createElement(Route, { path: "/", element: React.createElement(Navigate, { to: "/administration" /* PrivateRoutesEnum.ADMINISTRATION */ }) }),
            getRoutes(privateRoutes),
            getRoutes(publicRoutes),
            React.createElement(Route, { path: "*", element: React.createElement("div", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430") }))));
};
export default AppRouter;
//# sourceMappingURL=AppRouter.js.map