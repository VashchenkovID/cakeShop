import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { storageToken } from 'src/utils/storage';
import { PrivateRoutesEnum, PublicRoutesEnum } from 'src/router';
export interface PrivateRouterProps {}

const PrivateRoute: React.FC<PrivateRouterProps> = () => {
  const checkPrivateRouter = useMemo(() => {
    if (!storageToken() || storageToken() === 'НЕ АВТОРИЗОВАН') {
      return <Navigate to={PublicRoutesEnum.LOGIN} />;
    } else {
      return <Navigate to={PrivateRoutesEnum.ADMINISTRATION} />;
    }
  }, []);
  return checkPrivateRouter;
};

export default PrivateRoute;
