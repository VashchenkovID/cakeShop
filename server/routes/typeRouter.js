const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/create", checkRole("ADMIN"), typeController.create);
router.get("/getAll", typeController.getAll);
router.delete("/remove/:id", checkRole("ADMIN"), typeController.remove);

module.exports = router;
