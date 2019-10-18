import { Router } from "express";
import { login, token } from "../controllers/authController";

const authRouter = Router();

authRouter.get("/login", login);
authRouter.get("/token", token);

export default authRouter;
