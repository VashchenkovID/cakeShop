const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const orderController = require("../controllers/individualOrderController");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.post("/create", orderController.create);
router.put("/update/:id", checkRole("ADMIN"), orderController.update);
router.get("/getAll", orderController.getAll);
router.get("/getOne/:id", orderController.getOne);
router.delete(
    "/remove/:id",
    checkRole("ADMIN"),
    orderController.remove
);

module.exports = router;
