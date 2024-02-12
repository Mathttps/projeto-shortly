import { Router } from "express";
import { urlValid } from "../schema/schemaUrl.js";
import schemValid from "../middlewares/midValidate.js";
import { tokenValid } from "../middlewares/midSession.js";
import {  redirectUrl, deleteTsUrl, getUrl, shortenUrls } from "../controllers/controllUrl.js";

const urlRouter = Router()

urlRouter.get("/urls/:id", getUrl)
urlRouter.get("/urls/open/:shortUrl", redirectUrl)
urlRouter.delete("/urls/:id", tokenValid,deleteTsUrl)
urlRouter.post("/urls/shorten", schemValid(urlValid),tokenValid ,shortenUrls)


export default urlRouter