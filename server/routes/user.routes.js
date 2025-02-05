import { registerUser, loginUser, updateUser } from "../controllers/user.controller.js";
import express from "express"

const userRouter = express.Router()

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update/:userId", updateUser); 

export { userRouter };
