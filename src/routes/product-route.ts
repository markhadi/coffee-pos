import { Router } from "express";
import { Path } from "../constants/path";
import { ProductController } from "../controllers/product-controller";

export const productRouter = Router();

productRouter.post(Path.CreateProduct, ProductController.create);
productRouter.get(Path.SearchProduct, ProductController.search);
