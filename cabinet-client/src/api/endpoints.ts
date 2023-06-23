export const enum EnpointsEnum {
  //Десерт
  GET_CAKES = '/device/shop/getAll',
  GET_ONE_CAKE = '/device/shop/get',
  // Авторизация
  REGISTRATION_USER = '/user/registration',
  LOGIN_USER = '/user/login',
  AUTHORIZATION_USER = '/user/auth',
  CHECK_USER = '/user/refresh',
  // Вспомогательные типы
  GET_TYPES = '/type/getAll',
  GET_FILLINGS = '/filling/getAll',
  GET_BISCUITS = '/biscuit/getAll',
  // Создание заказов
  CREATE_INDIVIDUAL_ORDER = '/order/create',
  CREATE_USER_ORDER = '/basket/create',
  //Декор
  GET_DECOR = '/decor/getAll',
  CREATE_RATING = '/ratings/create',
  UPDATE_RATINGS = '/ratings/update',
  GET_RATINGS_FOR_DEVICE_NOT_USER = '/ratings/feedback/getDeviceRatings',
  GET_USER_RATINGS = '/ratings/getUserRatings',
  DELETE_RATING = '/ratings/remove',
}
