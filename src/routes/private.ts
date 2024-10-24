import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { userRouter } from "./user-route";
import { categoryRouter } from "./category-route";
import { productRouter } from "./product-route";
import { paymentRouter } from "./payment-route";
import { transactionRouter } from "./transaction-route";

export const privateRouter = express.Router();
privateRouter.use(authMiddleware);

privateRouter.use(userRouter);
privateRouter.use(categoryRouter);
privateRouter.use(productRouter);
privateRouter.use(paymentRouter);
privateRouter.use(transactionRouter);
