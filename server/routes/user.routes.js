import { registerUser,loginUser } from "../controllers/user.controller.js";
import express from "express"

const userRouter = express.Router()

userRouter.post("/register",registerUser)

userRouter.post("/login", loginUser)

export {userRouter}