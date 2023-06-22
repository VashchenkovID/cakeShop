const Router = require("express");
const router = new Router();
const analyticsController = require("../controllers/analyticsController");
const checkRole = require("../middleware/checkRoleMiddleware");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.get(
  "/getPopularity/:date",
  checkRole("ADMIN"),
  analyticsController.getPopularItems
);
router.get(
  "/getSales/:date",
  checkRole("ADMIN"),
  analyticsController.getMonthGraphicsSales
);

module.exports = router;
