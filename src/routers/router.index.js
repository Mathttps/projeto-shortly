import { Router } from "express";
import urlRouter from "./router.url.js";
import userRouter from "./router.user.js";
import rankingRouter from "./router.rank.js";

const router = Router()

router.use(urlRouter)
router.use(userRouter)
router.use(rankingRouter)

export default router