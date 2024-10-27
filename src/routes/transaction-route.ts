import { Router } from "express";
import { Path } from "../constants/path";
import { TransactionController } from "../controllers/transaction-controller";
import { roleMiddleware } from "../middlewares/role-middleware";

export const transactionRouter = Router();

// all roles can access these routes
transactionRouter.post(Path.CreateTransaction, TransactionController.create);
transactionRouter.get(
  Path.GetTodaySales,
  roleMiddleware("ADMIN"),
  TransactionController.getTodaySales
);
