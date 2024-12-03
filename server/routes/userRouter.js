const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/checkLogin", userController.checkLogin);

module.exports = router;
