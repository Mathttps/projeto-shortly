import { Router } from "express";
import { rankGet } from "../controllers/controllRank.js";

const rankingRouter = Router()

rankingRouter.get("/ranking", rankGet)

export default rankingRouter