export const enum EnpointsEnum {
  //Десерт
  CREATE_CAKE = '/device/shop/create',
  GET_CAKES = '/device/shop/getAll',
  GET_ONE_CAKE = '/device/shop/get/:id',
  REMOVE_CAKE = '/device/delete',
  EDIT_CAKE = '/device/shop/update',
  GET_RECIPE = '/device/shop/admin/getOne',
  // Авторизация
  REGISTRATION_USER = '/user/registration',
  LOGIN_USER = '/user/login',
  AUTHORIZATION_USER = '/user/auth',
  // Вспомогательные типы
  CREATE_TYPE = '/type/create',
  CREATE_FILLING = '/filling/create',
  CREATE_BISCUIT = '/biscuit/create',
  GET_TYPES = '/type/getAll',
  GET_FILLINGS = '/filling/getAll',
  GET_BISCUITS = '/biscuit/getAll',
  DELETE_TYPES = '/type/remove',
  DELETE_FILLINGS = '/filling/remove',
  DELETE_BISCUIT = '/biscuit/remove',
  UPDATE_TYPES = '/type/update',
  UPDATE_FILLINGS = '/filling/update',
  UPDATE_BISCUIT = '/biscuit/update',
  // Создание заказов
  CREATE_INDIVIDUAL_ORDER = '/order/create',
  CREATE_USER_ORDER = '/basket/create',
  // Обработка заказов
  GET_PROCESSING = '/order_processing/getOrders',
  GET_HISTORY = '/order_processing/getHistory',
  GET_HISTORY_ORDER = '/order_processing/getHistoryOrder',
  UPDATE_PROCESSING_ORDER = '/order_processing/updateOrder',
  GET_CRAFT_ORDER = '/order_processing/getCraftItems',
  // Аналитики
  GET_POPULAR = '/analytics/getPopularity',
  GET_SALES = '/analytics/getSales',
  GET_CALENDAR = '/calendar/dates',
  //Декор
  GET_DECOR_ADMIN = '/decor/getAllAdmin',
  GET_DECOR = '/decor/getAll',
  CREATE_DECOR = '/decor/create',
  UPDATE_DECOR = '/decor/update',
  DELETE_DECOR = '/decor/delete',
}
