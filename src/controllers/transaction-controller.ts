import { NextFunction, Request, Response } from "express";
import { CreateTransactionRequest } from "../models/transaction-model";
import { TransactionService } from "../services/transaction-service";
import { UserRequest } from "../types/user-request";

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
  static async getTodaySales(_: Request, res: Response, next: NextFunction) {
    try {
      const response = await TransactionService.getTodaySales();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async countToday(_: Request, res: Response, next: NextFunction) {
    try {
      const response = await TransactionService.countToday();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async getAverage(_: Request, res: Response, next: NextFunction) {
    try {
      const response = await TransactionService.getAverage();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
