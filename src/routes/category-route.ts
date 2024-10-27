import { Router } from "express";
import { Path } from "../constants/path";
import { CategoryController } from "../controllers/category-controller";
import { roleMiddleware } from "../middlewares/role-middleware";

export const categoryRouter = Router();

categoryRouter.post(
  Path.CreateCategory,
  roleMiddleware("ADMIN"),
  CategoryController.create
);
categoryRouter.get(
  Path.SearchCategory,
  roleMiddleware("ADMIN"),
  CategoryController.search
);
categoryRouter.get(
  Path.ListCategory,
  roleMiddleware("ADMIN"),
  CategoryController.list
);
categoryRouter.put(
  Path.UpdateCategory,
  roleMiddleware("ADMIN"),
  CategoryController.update
);
categoryRouter.delete(
  Path.RemoveCategory,
  roleMiddleware("ADMIN"),
  CategoryController.remove
);
