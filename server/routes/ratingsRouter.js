const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");

const ratingController = require("../controllers/ratingsController");

router.post("/create", ratingController.create);
router.put("/update", ratingController.update);
router.get("/getDeviceRatings", ratingController.getDeviceRatings);
router.get("/getUserRatings", ratingController.getUserRatings);
router.delete("/remove", ratingController.remove);

module.exports = router;
