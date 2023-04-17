const Router = require("express");
const router = new Router();
const orderProcessingController = require("../controllers/ordersProcessingController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get(
  "/getOrders/:date",
  checkRole("ADMIN"),
  orderProcessingController.getOrders
);
router.get(
  "/getHistory/:date",
  checkRole("ADMIN"),
  orderProcessingController.getHistory
);
router.get(
  "/getHistoryOrder/:type/:id",
  checkRole("ADMIN"),
  orderProcessingController.getHistoryOrder
);
router.put(
  "/updateOrder/:id",
  checkRole("ADMIN"),
  orderProcessingController.updateOrder
);

module.exports = router;
