import { User } from "@prisma/client";
import {
  CreatePaymentMethodRequest,
  PaymentMethodResponse,
} from "../models/payment-model";
import { Validation } from "../validators/validation";
import { PaymentValidation } from "../validators/payment-validation";
import { prismaClient } from "../apps/database";

export class PaymentService {
  static async create(
    user: User,
    request: CreatePaymentMethodRequest
  ): Promise<PaymentMethodResponse> {
    const createRequest = Validation.validate(
      PaymentValidation.CREATE,
      request
    );
    const paymentMethod = await prismaClient.paymentMethod.create({
      data: {
        ...createRequest,
        created_by_username: user.username,
        updated_by_username: user.username,
      },
    });
    return paymentMethod;
  }
}
