import { Router } from "express";
import {  signUpSchema, loginSchema } from "../schema/schemaUser.js";
import { userValid } from "../middlewares/midUser.js";
import schemValid from "../middlewares/midValidate.js";
import { usersLocal, signIn, signUp  } from "../controllers/controllUser.js";
import { tokenValid } from "../middlewares/midSession.js";

const userRouter = Router()

userRouter.get("/users/me", tokenValid, usersLocal)
userRouter.post("/signin", schemValid(loginSchema), signIn)
userRouter.post("/signup", schemValid(signUpSchema), userValid, signUp)


export default userRouter