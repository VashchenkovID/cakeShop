const Router = require("express");
const router = new Router();
const deviceRouter = require("./deviceRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const fillingRouter = require("./fillingRouter");
const basketRouter = require("./basketRouter");

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/type", typeRouter);
router.use("/filling", fillingRouter);
router.use("/basket", basketRouter);

module.exports = router;
