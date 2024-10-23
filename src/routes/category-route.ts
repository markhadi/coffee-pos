import { Router } from "express";
import { Path } from "../constants/path";
import { CategoryController } from "../controllers/category-controller";

export const categoryRouter = Router();

categoryRouter.post(Path.CreateCategory, CategoryController.create);
categoryRouter.get(Path.SearchCategory, CategoryController.search);
categoryRouter.put(Path.UpdateCategory, CategoryController.update);
categoryRouter.delete(Path.RemoveCategory, CategoryController.remove);
