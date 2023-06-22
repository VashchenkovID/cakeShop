const Router = require("express");
const router = new Router();
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
const ratingController = require("../controllers/ratingsController");

router.post("/create", ratingController.create);
router.put("/update", ratingController.update);
router.get("/feedback/getDeviceRatings", ratingController.getDeviceNotUserRatings);
router.get("/getDeviceRatings", ratingController.getDeviceRatings);
router.get("/getUserRatings", ratingController.getUserRatings);
router.delete("/remove", ratingController.remove);

module.exports = router;
