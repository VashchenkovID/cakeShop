const Router = require("express");
const router = new Router();
const orderProcessingController = require("../controllers/ordersProcessingController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/getOrders/:date", checkRole("ADMIN"), orderProcessingController.getOrders);

module.exports = router;
