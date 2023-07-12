import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { storageToken } from 'src/utils/storage';
const PrivateRoute = () => {
    const checkPrivateRouter = useMemo(() => {
        if (!storageToken() || storageToken() === 'НЕ АВТОРИЗОВАН') {
            return React.createElement(Navigate, { to: "/login" /* PublicRoutesEnum.LOGIN */ });
        }
        else {
            return React.createElement(Navigate, { to: "/administration" /* PrivateRoutesEnum.ADMINISTRATION */ });
        }
    }, []);
    return checkPrivateRouter;
};
export default PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map