const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const orderController = require("../controllers/individualOrderController");

router.post("/order/create", orderController.create);
router.put("/order/update/:id", checkRole("ADMIN"), orderController.update);
router.get("/order/getAll", orderController.getAll);
router.get("/order/getOne/:id", orderController.getOne);
router.delete(
    "/order/remove/:id",
    checkRole("ADMIN"),
    orderController.remove
);

module.exports = router;
