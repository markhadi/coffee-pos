import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateTransactionRequest } from "../models/transaction-model";
import { TransactionService } from "../services/transaction-service";

export class TransactionController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateTransactionRequest =
        req.body as CreateTransactionRequest;
      const response = await TransactionService.create(req.user!, request);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
