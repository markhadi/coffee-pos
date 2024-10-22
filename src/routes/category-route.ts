import { Router } from "express";
import { Path } from "../constants/path";
import { CategoryController } from "../controllers/category-controller";

export const categoryRouter = Router();

categoryRouter.post(Path.CreateCategory, CategoryController.create);
categoryRouter.get(Path.SearchCategory, CategoryController.search);
