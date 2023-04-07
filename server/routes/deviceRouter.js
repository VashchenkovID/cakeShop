const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/shop/create", checkRole("ADMIN"), deviceController.create);
router.put("/shop/update/:id", checkRole("ADMIN"), deviceController.update);
router.get("/shop/getAll", deviceController.getAll);
router.get("/shop/get/:id", deviceController.getOne);
router.get(
  "/shop/admin/getOne/:id",
  checkRole("ADMIN"),
  deviceController.getOneForAdmin
);
router.delete("/delete/:id", checkRole("ADMIN"), deviceController.remove);

module.exports = router;
