import express from "express";
import { Path } from "../constants/path";
import { UserController } from "../controllers/user-controller";

export const publicRouter = express.Router();

publicRouter.post(Path.LoginUser, UserController.login);
publicRouter.get(Path.RefreshUser, UserController.refresh);
