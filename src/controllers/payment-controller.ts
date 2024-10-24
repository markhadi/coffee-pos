import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreatePaymentMethodRequest } from "../models/payment-model";
import { PaymentService } from "../services/payment-service";

export class PaymentController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreatePaymentMethodRequest =
        req.body as CreatePaymentMethodRequest;
      const response = await PaymentService.create(req.user!, request);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
