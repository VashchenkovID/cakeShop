import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectIsAuth } from "../../store/features/auth/selectors";
import axios from "axios";
import { AuthResponse } from "../../api/requests/userAPI";
import { EnpointsEnum } from "../../api/endpoints";
import { setIsAuth } from "../../store/features/auth/AuthSlice";
import { LocalStorageKeysEnum, PublicRoutesEnum } from "../../utils/enum";
import { storageToken } from "../../utils/storage";
import AuthContainer from "../../pages/Auth/AuthContainer";

import Catalog from "../../pages/Catalog/Catalog";
import CreateOrder from "../../pages/CreateOrder/CreateOrder";
import { BasketModel } from "../../api/models/BasketModel";
import { setBasket } from "../../store/features/basket/BasketSlice";
import StartPage from "../../pages/StartPage/StartPage";
import DeviceView from "../../pages/DeviceView/DeviceView";

export interface IRouteItem {
  path: string;
  element: JSX.Element;
}

export const publicRoutes: Array<IRouteItem> = [
  { path: `${PublicRoutesEnum.AUTH}`, element: <AuthContainer /> },
  { path: `${PublicRoutesEnum.LOGIN}`, element: <AuthContainer /> },
  { path: `${PublicRoutesEnum.SHOP}`, element: <Catalog /> },
  {
    path: `${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`,
    element: <CreateOrder />,
  },
  { path: `${PublicRoutesEnum.VIEW_DESSERT}/:id`, element: <DeviceView /> },
  { path: `${PublicRoutesEnum.FILLINGS}`, element: <div>fillings</div> },
  { path: `${PublicRoutesEnum.INDIVIDUAL}`, element: <div>individual</div> },
  { path: `${PublicRoutesEnum.GENERAL}`, element: <StartPage /> },
];

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const basket: string | null = localStorage.getItem("Basket");
  const checkIsAuth = async () => {
    try {
      const response = await axios.get<AuthResponse>(
        `${import.meta.env.VITE_API_URL}${EnpointsEnum.CHECK_USER}`,
        { withCredentials: true }
      );
      localStorage.setItem(
        LocalStorageKeysEnum.TOKEN,
        response.data.accessToken
      );
      dispatch(setIsAuth(true));
    } catch (e) {
      dispatch(setIsAuth(false));
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
    if (storageToken() || storageToken() !== "undefined") {
      checkIsAuth();
    }
  }, []);
  useEffect(() => {
    if (basket && JSON.parse(basket)) {
      dispatch(setBasket(JSON.parse(basket) as BasketModel));
    }
  }, [basket]);

  return (
    <>
      <Routes>
        {getRoutes(publicRoutes)}
        <Route
          path="/"
          element={<Navigate to={PublicRoutesEnum.SHOP} replace />}
        />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </>
  );
};

export default React.memo(AppRouter);
