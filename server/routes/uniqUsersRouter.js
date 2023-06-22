const Router = require("express");
const router = new Router();
const uniqUsersController = require("../controllers/uniqUsersController");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.get("/users", uniqUsersController.getUniqUsers);
module.exports = router;
