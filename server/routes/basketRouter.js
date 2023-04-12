const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const basketController = require("../controllers/basketController");

router.post("/create", basketController.create);
router.put("/update/:id", checkRole("ADMIN"), basketController.update);
router.get("/getAll", basketController.getAll);
router.get("/getOne/:id", basketController.getOne);
router.delete(
  "/remove/:id",
  checkRole("ADMIN"),
  basketController.remove
);

module.exports = router;
