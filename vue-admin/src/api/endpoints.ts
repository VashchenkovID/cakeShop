export enum EnpointsEnum {
  //Десерт
  CREATE_CAKE = "/device/shop/create",
  GET_CAKES = "/device/shop/getAll",
  GET_ONE_CAKE = "/device/shop/get",
  REMOVE_CAKE = "/device/delete",
  EDIT_CAKE = "/device/shop/update",
  GET_RECIPE = "/device/shop/admin/getOne",
  // Авторизация
  REGISTRATION_USER = "/user/registration",
  LOGIN_USER = "/user/login",
  AUTHORIZATION_USER = "/user/auth",
  CHECK_USER = "/user/refresh",
  // Вспомогательные типы
  CREATE_TYPE = "/type/create",
  CREATE_FILLING = "/filling/create",
  CREATE_BISCUIT = "/biscuit/create",
  GET_TYPES = "/type/getAll",
  GET_FILLINGS = "/filling/getAll",
  GET_BISCUITS = "/biscuit/getAll",
  DELETE_TYPES = "/type/remove",
  DELETE_FILLINGS = "/filling/remove",
  DELETE_BISCUIT = "/biscuit/remove",
  UPDATE_TYPES = "/type/update",
  UPDATE_FILLINGS = "/filling/update",
  UPDATE_BISCUIT = "/biscuit/update",
  // Создание заказов
  CREATE_INDIVIDUAL_ORDER = "/order/create",
  CREATE_USER_ORDER = "/basket/create",
  // Обработка заказов
  GET_PROCESSING = "/order_processing/getOrders",
  GET_HISTORY = "/order_processing/getHistory",
  GET_HISTORY_ORDER = "/order_processing/getHistoryOrder",
  UPDATE_PROCESSING_ORDER = "/order_processing/updateOrder",
  GET_CRAFT_ORDER = "/order_processing/getCraftItems",
  // Аналитики
  GET_POPULAR = "/analytics/getPopularity",
  GET_SALES = "/analytics/getSales",
  GET_CALENDAR = "/calendar/dates",
  //Декор
  GET_DECOR_ADMIN = "/decor/getAllAdmin",
  GET_DECOR = "/decor/getAll",
  CREATE_DECOR = "/decor/create",
  UPDATE_DECOR = "/decor/update",
  DELETE_DECOR = "/decor/delete",
  //Рейтинги
  CREATE_RATING = "/ratings/create",
  UPDATE_RATINGS = "/ratings/update",
  GET_RATINGS_FOR_DEVICE_NOT_USER = "/ratings/feedback/getDeviceRatings",
  GET_RATINGS_FOR_DEVICE = "/ratings/getDeviceRatings",
  GET_USER_RATINGS = "/ratings/getUserRatings",
  DELETE_RATING = "/ratings/remove",
  // Заметки
  GET_TODOS = "/todoList/getTodo",
  CREATE_TODOS = "/todoList/create",
  UPDATE_TODOS = "/todoList/update",
  DELETE_TODOS = "/todoList/delete",
  // Уникальные пользователи
  GET_UNIQ_USERS = "/uniqUsers/users",
  // Для селектов
  GET_ENT_DEVICE = "/device/entity",
}
