import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import {
  CreatePaymentMethodRequest,
  SearchPaymentMethodRequest,
} from "../models/payment-model";
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
  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchPaymentMethodRequest = {
        search: req.query?.search,
        size: req.query?.size ? Number(req.query.size) : undefined,
        cursor: req.query?.cursor ? Number(req.query.cursor) : undefined,
      } as SearchPaymentMethodRequest;
      const response = await PaymentService.search(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
