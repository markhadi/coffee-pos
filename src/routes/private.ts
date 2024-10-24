import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { userRouter } from "./user-route";
import { categoryRouter } from "./category-route";
import { productRouter } from "./product-route";
import { paymentRouter } from "./payment-route";

export const privateRouter = express.Router();
privateRouter.use(authMiddleware);

privateRouter.use(userRouter);
privateRouter.use(categoryRouter);
privateRouter.use(productRouter);
privateRouter.use(paymentRouter);
