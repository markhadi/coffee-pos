import { Router } from "express";
import { Path } from "../constants/path";
import { roleMiddleware } from "../middlewares/role-middleware";
import { UserController } from "../controllers/user-controller";

export const userRouter = Router();

userRouter.post(
  Path.CreateUser,
  roleMiddleware("ADMIN"),
  UserController.create
);
userRouter.get(Path.SearchUser, roleMiddleware("ADMIN"), UserController.search);
