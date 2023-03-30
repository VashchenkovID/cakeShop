import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { storageToken } from 'src/utils/storage';
import { PublicRoutesEnum } from 'src/router';
export interface PrivateRouterProps {}

const PrivateRoute: React.FC<PrivateRouterProps> = () => {
  const checkPrivateRouter = useMemo(() => {
    if (!storageToken()) {
      return <Navigate to={PublicRoutesEnum.SHOP} />;
    } else {
      return <Outlet />;
    }
  }, []);
  return checkPrivateRouter;
};

export default PrivateRoute;
