export interface IRouteItem {
  path: string;
  element: JSX.Element;
}

export const enum PrivateRoutesEnum {
  ADMINISTRATION = '/administration',
  CREATE_CAKE = '/create-cake',
  CALENDAR = '/calendar',
  EDIT_CAKE = '/edit-cake',
  ANALYTICS = '/analytics',
  RECIPES = '/recipes',
  ORDERS = '/orders',
  ORDERS_HISTORY = '/history',
  TYPES = '/types',
  FEEDBACK = '/feedback',
  CALCULATE = '/calculate',
  REFERENCE = '/reference'
}

export const enum PublicRoutesEnum {
  AUTH = '/auth',
  LOGIN = '/login',
  SHOP = '/shop',
}
