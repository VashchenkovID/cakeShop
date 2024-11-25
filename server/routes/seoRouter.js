const Router = require("express");
const router = new Router();
const seoController = require("../controllers/seoController");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.post("/create", seoController.create);
router.post("/remove", seoController.remove);
router.post("/update", seoController.update);

module.exports = router;