const Router = require("express");
const router = new Router();
const fillingController = require("../controllers/fillingController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRole("ADMIN"), fillingController.create);
router.get("/getAll", fillingController.getAll);
router.put("/update/:id", checkRole("ADMIN"), fillingController.update);
router.delete("/remove/:id", checkRole("ADMIN"), fillingController.remove);
module.exports = router;