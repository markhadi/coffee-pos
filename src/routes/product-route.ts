import { Router } from "express";
import { Path } from "../constants/path";
import { ProductController } from "../controllers/product-controller";

export const productRouter = Router();

productRouter.post(Path.CreateProduct, ProductController.create);
productRouter.get(Path.SearchProduct, ProductController.search);
productRouter.put(Path.UpdateProduct, ProductController.update);
productRouter.delete(Path.RemoveProduct, ProductController.remove);
