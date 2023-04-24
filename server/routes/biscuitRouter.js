const Router = require("express");
const router = new Router();
const biscuitController = require("../controllers/biscuitController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRole("ADMIN"), biscuitController.create);
router.get("/getAll", biscuitController.getAll);
router.put("/update/:id", checkRole("ADMIN"), biscuitController.update);
router.delete("/remove/:id", checkRole("ADMIN"), biscuitController.remove);
module.exports = router;
