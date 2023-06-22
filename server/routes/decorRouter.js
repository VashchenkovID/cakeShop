const Router = require("express");
const router = new Router();
const decorController = require("../controllers/decorController");
const checkRole = require("../middleware/checkRoleMiddleware");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.get("/getAllAdmin", checkRole("ADMIN"), decorController.getAllAdmin);
router.get("/getAll", decorController.getAll);
router.post("/create", checkRole("ADMIN"), decorController.create);
router.put("/update/:id", checkRole("ADMIN"), decorController.update);
router.delete("/delete/:id", checkRole("ADMIN"), decorController.remove);

module.exports = router;
