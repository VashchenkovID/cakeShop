export enum LocalStorageKeysEnum {
  TOKEN = "token",
  USER = 'user'
}

export const enum RequestStatusEnum {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export enum HeaderIdEnum {
  GENERAL = "general",
  SHOP = "shop",
  MY_ORDERS = "my_orders",
  MY_FEEDBACK = "my_feedback",
}
export enum PublicRoutesEnum {
  GENERAL = "/general",
  SHOP = "/shop",
  INDIVIDUAL = "/individual",
  VIEW_DESSERT = "/view/dessert",
  AUTH = "/auth",
  LOGIN = "/login",
  RATINGS = "/ratings",
  FEEDBACK = "/feedback",
  VIEW_ORDER = "/order",
  CREATE_RATING = "/ratings/create",
  CREATE_ORDER = "/create",
}
export enum PrivateRoutesEnum {
  MY_ORDERS = "/orders",
  MY_FEEDBACK = "/feedback",
}
