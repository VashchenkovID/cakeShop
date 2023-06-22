const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const todoListController = require("../controllers/TodoListController");
const watchAudit = require("../middleware/WatchAuditMiddleware");
router.use(watchAudit());
router.get('/getTodo',checkRole('ADMIN'),todoListController.getAll)
router.get('/getTodo/:id',checkRole('ADMIN'),todoListController.getOne)
router.post('/create', checkRole('ADMIN'),todoListController.create)
router.put('/update/:id', checkRole('ADMIN'),todoListController.update)
router.delete('/delete/:id', checkRole('ADMIN'),todoListController.remove)

module.exports = router