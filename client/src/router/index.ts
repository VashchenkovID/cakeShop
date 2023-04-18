export interface IRouteItem {
  path: string;
  element: JSX.Element;
}

export const enum RoutesParamsEnum {
  ID = '/:id',
}

export const enum PrivateRoutesEnum {
  ADMINISTRATION = '/administration',
  BASKET = '/directories',
  CREATE_CAKE = '/create-cake',
  EDIT_CAKE = '/edit-cake',
  ANALYTICS = 'analytics',
  RECIPES = 'recipes',
  ORDERS = 'orders',
  ORDERS_HISTORY = 'history',
  TYPES = 'types',
}

export const enum PublicRoutesEnum {
  GENERAL = '/general',
  AUTH = '/auth',
  LOGIN = '/login',
  INFO_PAGE = '/info',
  SHOP = '/shop',
  VIEW_CAKE = '/shop/view',
  ADMINISTRATION = '/administration',
  VIEW_ORDER = '/view/order',
}
