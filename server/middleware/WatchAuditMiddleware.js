const TokenService = require("../services/token-service");
const { Audit, UniqUser } = require("../models/models");

function checkEndpoint(url) {
  if (url.includes("/user/login")) {
    return "Запрос на вход в приложение пользователя";
  }
  if (url.includes("/user/refresh")) {
    return "Обновление токена доступа пользователя";
  }
  if (url.includes("/user/registration")) {
    return "Регистрация нового пользователя";
  }
  if (url.includes("/user/logout")) {
    return "Выход из приложения пользователя";
  }
  if (url.includes("/device/shop/create")) {
    return "Создание рецепта пользователем";
  }
  if (url.includes("/device/shop/update")) {
    return "Редактирование рецепта пользователем";
  }
  if (url.includes("/device/shop/getAll")) {
    return "Получение списка изделий/рецептов";
  }
  if (url.includes("/device/shop/admin/getOne")) {
    return "Получение рецепта пользователем";
  }
  if (url.includes("/device/delete")) {
    return "Удаление рецепта пользователем";
  }
  if (url.includes("/type/create")) {
    return "Создание типа изделия пользователем";
  }
  if (url.includes("/type/update")) {
    return "Редактирование типа изделия пользователем";
  }
  if (url.includes("/type/remove")) {
    return "Удаление типа изделия пользователем";
  }
  if (url.includes("/type/getAll")) {
    return "Получение типов изделий";
  }
  if (url.includes("/filling/create")) {
    return "Создание начинки пользователем";
  }
  if (url.includes("/filling/update")) {
    return "Редактирование начинки пользователем";
  }
  if (url.includes("/filling/remove")) {
    return "Удаление начинки пользователем";
  }
  if (url.includes("/filling/getAll")) {
    return "Получение начинок";
  }
  if (url.includes("/biscuit/create")) {
    return "Создание бисквита пользователем";
  }
  if (url.includes("/biscuit/update")) {
    return "Редактирование бисквита пользователем";
  }
  if (url.includes("/biscuit/remove")) {
    return "Удаление бисквита пользователем";
  }
  if (url.includes("/biscuit/getAll")) {
    return "Получение бисквитов";
  }
  if (url.includes("/basket/create")) {
    return "Создание заказа";
  }
  if (url.includes("/basket/update")) {
    return "Редактирование статуса заказа";
  }
  if (url.includes("/basket/remove")) {
    return "Удаление заказа";
  }
  if (url.includes("/basket/getAll")) {
    return "Получение списка заказов";
  }
  if (url.includes("/basket/getOne")) {
    return "Получение заказа";
  }
  if (url.includes("/order/create")) {
    return "Создание заказа незарегистрированного пользователя";
  }
  if (url.includes("/order/update")) {
    return "Редактирование статуса заказа незарегистрированного пользователя";
  }
  if (url.includes("/order/remove")) {
    return "Удаление заказа незарегистрированного пользователя";
  }
  if (url.includes("/order/getAll")) {
    return "Получение списка заказов незарегистрированных пользователей";
  }
  if (url.includes("/order/getOne")) {
    return "Получение заказа незарегистрированного пользователя";
  }
  if (url.includes("/analytics/getPopularity")) {
    return "Получение популярности изделий";
  }
  if (url.includes("/analytics/getSales")) {
    return "Получение графика продаж пользователем";
  }
  if (url.includes("/calendar/dates")) {
    return "Получение календаря заказов пользователем";
  }
  if (url.includes("/decor/getAllAdmin")) {
    return "Получение списка декора для администратора пользователем";
  }
  if (url.includes("/decor/getAll")) {
    return "Получение списка декора";
  }
  if (url.includes("/decor/create")) {
    return "Создание декора пользователем";
  }

  if (url.includes("/decor/update")) {
    return "Редактирование декора пользователем";
  }
  if (url.includes("/decor/delete")) {
    return "Удаление декора пользователем";
  }

  if (url.includes("/ratings/create")) {
    return "Создание рейтинга";
  }
  if (url.includes("/ratings/update")) {
    return "Редактирование рейтинга";
  }
  if (url.includes("/ratings/feedback/getDeviceRatings")) {
    return "Получение списка рейтингов изделия пользователем";
  }
  if (url.includes("/ratings/getDeviceRatings")) {
    return "Получение списка рейтингов изделия";
  }
  if (url.includes("/ratings/getUserRatings")) {
    return "Получение списка рейтингов для пользователя";
  }
  if (url.includes("/ratings/remove")) {
    return "Удаление рейтинга";
  }
  if (url.includes("/order_processing/getOrders")) {
    return "Получение заказов для обработки пользователем";
  }
  if (url.includes("/order_processing/getCraftItems")) {
    return "Получение заказов для разработки пользователем";
  }
  if (url.includes("/order_processing/getHistory")) {
    return "Получение истории заказов";
  }
  if (url.includes("/order_processing/getHistoryOrder")) {
    return "Получение заказа из истории";
  }
  if (url.includes("/todoList/getTodo")) {
    return "Получение списка заметок пользователем";
  }
  if (url.includes("/todoList/getTodo/")) {
    return "Получение информации о заметке пользователем";
  }
  if (url.includes("/todoList/create")) {
    return "Создание заметки пользователем";
  }
  if (url.includes("/todoList/update")) {
    return "Редактирование заметки пользователем";
  }
  if (url.includes("/todoList/delete")) {
    return "Удаление заметки пользователем";
  }
  if (url.includes("/uniqUsers/users")) {
    return "Получение списка уникальных посетителей пользователем";
  }
}

module.exports = function () {
  return async function (req, res, next) {
    const url = req.originalUrl;
    const clientIP = req.socket?.remoteAddress || req.ip;
    const allUsers = await UniqUser.findAll();
    if (!allUsers.map((user) => user.address).includes(clientIP)) {
      await UniqUser.create({
        address: clientIP,
      });
    }
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader?.split(" ")[1];

    if (accessToken === "null" || !accessToken) {
      await Audit.create({
        description: `${checkEndpoint(url)}`,
        user: "Не авторизирован",
      });
    } else {
      const userData = TokenService.validateAccessToken(accessToken);
      console.log(accessToken, userData, url);
      if (userData) {
        await Audit.create({
          description: `${checkEndpoint(url)} ${
            userData?.fullName || userData?.name
          }`,
          user: userData.fullName || userData?.name || "Неизвестен",
        });
      }
    }
    next();
  };
};
