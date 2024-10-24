import { Router } from "express";
import { Path } from "../constants/path";
import { TransactionController } from "../controllers/transaction-controller";

export const transactionRouter = Router();

// all roles can access these routes
transactionRouter.post(Path.CreateTransaction, TransactionController.create);
