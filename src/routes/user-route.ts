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
userRouter.delete(Path.LogoutUser, UserController.logout);
userRouter.put(Path.UpdateUser, roleMiddleware("ADMIN"), UserController.update);
userRouter.delete(
  Path.RemoveUser,
  roleMiddleware("ADMIN"),
  UserController.remove
);
