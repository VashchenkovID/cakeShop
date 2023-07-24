import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { IRouteItem, PrivateRoutesEnum, PublicRoutesEnum } from "src/router";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import AuthContainer from "src/pages/Auth/AuthContainer";
import { storageToken } from "src/utils/storage";
import { LocalStorageKeysEnum } from "src/utils/enum";
import { setIsAuth } from "src/redux/features/auth/AuthSlice";
import MainPage from "src/pages/MainPage/MainPage";
import { EnpointsEnum } from "src/api/endpoints";
import axios from "axios";
import { AuthResponse } from "src/api/requests/userAPI";
import AdministrationRecipes from "src/pages/AdministrationRecipes/AdministrationRecipes";
import AdministrationRecipesCreate from "src/pages/AdministrationRecipes/AdministrationRecipesCreate/AdministrationRecipesCreate";
import AdministrationAnalytics from "src/pages/AdministrationAnalytics/AdministrationAnalytics";
import AdministrationTypes from "src/pages/AdministrationTypes/AdministrationTypes";
import AdministrationOrders from "src/pages/AdministrationOrders/AdministrationOrders";
import AdministrationOrdersProcessing from "src/pages/AdministrationOrdersProcessing/AdministrationOrdersProcessing";
import AdministrationFeedback from "src/pages/AdministrationFeedback/AdministrationFeedback";
import AdministrationCalendar from "src/pages/AdministrationCalendar/AdministrationCalendar";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectIsAuth } from "src/redux/features/auth/selectors";
import PrivateRoute from "src/components/PrivateRoute";
import { $authHost } from "src/api/requests";
import AdministrationCalculate from "src/pages/AdministrationCalculate/AdministrationCalculate";
import AdministrationReference from "src/pages/AdministrationReference/AdministrationReference";

export const publicRoutes: Array<IRouteItem> = [
  { path: `${PublicRoutesEnum.AUTH}`, element: <AuthContainer /> },
  { path: `${PublicRoutesEnum.LOGIN}`, element: <AuthContainer /> },
];

export const privateRoutes: Array<IRouteItem> = [
  {
    path: PrivateRoutesEnum.ADMINISTRATION,
    element: <MainPage />,
  },
  {
    path: `${PrivateRoutesEnum.RECIPES}`,
    element: <AdministrationRecipes />,
  },
  {
    path: `${PrivateRoutesEnum.CREATE_CAKE}`,
    element: <AdministrationRecipesCreate />,
  },
  {
    path: `${PrivateRoutesEnum.EDIT_CAKE}/:id`,
    element: <AdministrationRecipesCreate />,
  },
  {
    path: `${PrivateRoutesEnum.ANALYTICS}`,
    element: <AdministrationAnalytics />,
  },
  {
    path: `${PrivateRoutesEnum.TYPES}`,
    element: <AdministrationTypes />,
  },
  {
    path: `${PrivateRoutesEnum.ORDERS}`,
    element: <AdministrationOrdersProcessing />,
  },
  {
    path: `${PrivateRoutesEnum.ORDERS_HISTORY}`,
    element: <AdministrationOrders />,
  },
  {
    path: `${PrivateRoutesEnum.FEEDBACK}`,
    element: <AdministrationFeedback />,
  },
  {
    path: `${PrivateRoutesEnum.CALENDAR}`,
    element: <AdministrationCalendar />,
  },
  {
    path: `${PrivateRoutesEnum.CALCULATE}`,
    element: <AdministrationCalculate />,
  },
  {
    path: `${PrivateRoutesEnum.REFERENCE}`,
    element: <AdministrationReference />,
  },
];

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuth);
  const checkIsAuth = async () => {
    try {
      const response = await $authHost.get<AuthResponse>(
        `${EnpointsEnum.CHECK_USER}`
      );
      localStorage.setItem(
        LocalStorageKeysEnum.TOKEN,
        response.data.refreshToken
      );
      dispatch(setIsAuth(true));
    } catch (e) {
      dispatch(setIsAuth(false));
      localStorage.clear();
      navigate(PublicRoutesEnum.LOGIN);
    }
  };
  const getRoutes = (routes: IRouteItem[]) => {
    return routes.map(({ path, element }) => (
      <Route
        key={Array.isArray(path) ? path?.[0] : path}
        path={path}
        element={element}
      ></Route>
    ));
  };
  useEffect(() => {
    if (storageToken() && storageToken() !== "undefined") {
      checkIsAuth();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />} />
        <Route
          path="/"
          element={<Navigate to={PrivateRoutesEnum.ADMINISTRATION} />}
        />
        {getRoutes(privateRoutes)}
        {getRoutes(publicRoutes)}
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </>
  );
};

export default AppRouter;
