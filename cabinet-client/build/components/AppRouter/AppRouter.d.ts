import React from "react";
export interface IRouteItem {
    path: string;
    element: JSX.Element;
}
export declare const publicRoutes: Array<IRouteItem>;
declare const AppRouter: () => React.JSX.Element;
export default AppRouter;
