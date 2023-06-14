import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IRouteItem, PrivateRoutesEnum, PublicRoutesEnum } from 'src/router';

import PrivateRoute from 'src/components/PrivateRoute';
import ShopPage from 'src/pages/ShopPage/ShopPage';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import AuthContainer from 'src/pages/Auth/AuthContainer';
import { storageToken } from 'src/utils/storage';
import { LocalStorageKeysEnum } from 'src/utils/enum';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectIsAuth } from 'src/redux/features/auth/selectors';
import { setIsAuth } from 'src/redux/features/auth/AuthSlice';
import AdministrationPage from 'src/pages/AdministrationPage/AdministrationPage';
import CreateOrder from 'src/pages/CreateOrder/CreateOrder';
import MainPage from 'src/pages/MainPage/MainPage';
import AddRatingPage from 'src/pages/AddRatingPage/AddRatingPage';
import { $authHost } from 'src/api/requests';
import { EnpointsEnum } from 'src/api/endpoints';
import axios from 'axios';
import { AuthResponse } from 'src/api/requests/userAPI';

export const publicRoutes: Array<IRouteItem> = [
  {
    path: PublicRoutesEnum.GENERAL,
    element: <MainPage />,
  },
  {
    path: PublicRoutesEnum.SHOP,
    element: <ShopPage />,
  },
  { path: `${PublicRoutesEnum.CREATE_RATING}/:id`, element: <AddRatingPage /> },
  { path: `${PublicRoutesEnum.AUTH}`, element: <AuthContainer /> },
  { path: `${PublicRoutesEnum.LOGIN}`, element: <AuthContainer /> },
  { path: PublicRoutesEnum.INFO_PAGE, element: <div></div> },
  {
    path: `${PublicRoutesEnum.VIEW_ORDER}`,
    element: <CreateOrder />,
  },
];

export const privateRoutes: Array<IRouteItem> = [
  { path: PrivateRoutesEnum.ADMINISTRATION, element: <AdministrationPage /> },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}/create`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}/edit`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.ANALYTICS}`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.TYPES}`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.ORDERS}`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.ORDERS_HISTORY}`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.FEEDBACK}`,
    element: <AdministrationPage />,
  },
  {
    path: `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.CALENDAR}`,
    element: <AdministrationPage />,
  },
  { path: PrivateRoutesEnum.BASKET, element: <div></div> },
  { path: PrivateRoutesEnum.CREATE_CAKE, element: <div></div> },
  { path: PrivateRoutesEnum.EDIT_CAKE, element: <div></div> },
];

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const [role, setRole] = useState(
    localStorage.getItem(LocalStorageKeysEnum.ROLE),
  );
  const isAuth = useAppSelector(selectIsAuth);

  const checkIsAuth = async () => {
    try {
      const response = await axios.get<AuthResponse>(
        `${process.env.REACT_APP_API_URL}${EnpointsEnum.CHECK_USER}`,
        { withCredentials: true },
      );
      console.log(response)
      localStorage.setItem(
        LocalStorageKeysEnum.TOKEN,
        response.data.accessToken,
      );
      setRole(response.data.user.role);
      dispatch(setIsAuth(true));
    } catch (e) {
      setRole('');
      dispatch(setIsAuth(false));
    }
  };

  useEffect(() => {
    if (storageToken() && storageToken() !== 'undefined') {
      checkIsAuth();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={PublicRoutesEnum.GENERAL} />} />

        {[...publicRoutes, ...(isAuth ? privateRoutes : [])].map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to={PublicRoutesEnum.SHOP} />} />
          {role === 'ADMIN' &&
            privateRoutes.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))}
        </Route>

        <Route
          path="*"
          element={<Navigate to={PublicRoutesEnum.INFO_PAGE} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
