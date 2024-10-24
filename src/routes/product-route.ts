import { Router } from "express";
import { Path } from "../constants/path";
import { ProductController } from "../controllers/product-controller";
import { roleMiddleware } from "../middlewares/role-middleware";

export const productRouter = Router();

productRouter.post(
  Path.CreateProduct,
  roleMiddleware("ADMIN"),
  ProductController.create
);
productRouter.get(
  Path.SearchProduct,
  roleMiddleware("ADMIN"),
  ProductController.search
);
productRouter.put(
  Path.UpdateProduct,
  roleMiddleware("ADMIN"),
  ProductController.update
);
productRouter.delete(
  Path.RemoveProduct,
  roleMiddleware("ADMIN"),
  ProductController.remove
);
