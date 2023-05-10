export interface IRouteItem {
  path: string;
  element: JSX.Element;
}

export const enum PrivateRoutesEnum {
  ADMINISTRATION = '/administration',
  BASKET = '/directories',
  CREATE_CAKE = '/create-cake',
  CALENDAR = '/calendar',
  EDIT_CAKE = '/edit-cake',
  ANALYTICS = 'analytics',
  RECIPES = 'recipes',
  ORDERS = 'orders',
  ORDERS_HISTORY = 'history',
  TYPES = 'types',
  FEEDBACK = 'feedback',
}

export const enum PublicRoutesEnum {
  GENERAL = '/general',
  AUTH = '/auth',
  LOGIN = '/login',
  INFO_PAGE = '/info',
  SHOP = '/shop',
  VIEW_CAKE = '/shop/view',
  VIEW_ORDER = '/view/order',
  CREATE_RATING = '/create/rating',
}
