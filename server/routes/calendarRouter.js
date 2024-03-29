const Router = require("express");
const router = new Router();
const calendarController = require("../controllers/calendarController");
const checkRole = require("../middleware/checkRoleMiddleware");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.get("/dates/:date", checkRole("ADMIN"), calendarController.getCalendar);

module.exports = router;