const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const basketController = require("../controllers/basketController");

router.post("/basket/create", basketController.create);
router.get("/basket/getAll", basketController.getAll);
router.get("/basket/getOne/:id", basketController.getOne);
router.delete(
  "/basket/remove/:id",
  checkRole("ADMIN"),
  basketController.remove
);

module.exports = router;
