import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { userRouter } from "./user-route";

export const privateRouter = express.Router();
privateRouter.use(authMiddleware);

privateRouter.use(userRouter);
