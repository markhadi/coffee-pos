import { Router } from "express";
import { Path } from "../constants/path";
import { TransactionController } from "../controllers/transaction-controller";
import { roleMiddleware } from "../middlewares/role-middleware";

export const transactionRouter = Router();

// all roles can access these routes
transactionRouter.post(Path.CreateTransaction, TransactionController.create);
transactionRouter.get(
  Path.GetTodaySalesTransaction,
  roleMiddleware("ADMIN"),
  TransactionController.getTodaySales
);
transactionRouter.get(
  Path.CountTodayTransaction,
  roleMiddleware("ADMIN"),
  TransactionController.countToday
);
transactionRouter.get(
  Path.GetAverageTransaction,
  roleMiddleware("ADMIN"),
  TransactionController.getAverage
);
transactionRouter.get(
  Path.GetLast7DaysSalesTransaction,
  roleMiddleware("ADMIN"),
  TransactionController.getLast7DaysSales
);
