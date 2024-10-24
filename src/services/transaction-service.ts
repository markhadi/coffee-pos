import { User } from "@prisma/client";
import {
  CreateTransactionRequest,
  TransactionResponse,
} from "../models/transaction-model";
import { Validation } from "../validators/validation";
import { TransactionValidation } from "../validators/transaction-validation";
import { PaymentService } from "./payment-service";
import { prismaClient } from "../apps/database";
import { generateTransactionId } from "../utilities";

export class TransactionService {
  static async create(
    user: User,
    request: CreateTransactionRequest
  ): Promise<TransactionResponse> {
    const createRequest = Validation.validate(
      TransactionValidation.CREATE,
      request
    );
    const payment = await PaymentService.isPaymentMethodExists(
      createRequest.payment_method_id
    );
    const transactionId = generateTransactionId();
    const transaction = await prismaClient.productTransaction.create({
      data: {
        ...createRequest,
        payment_method: payment.name,
        transaction_id: transactionId,
        service_by: user.username,
        username: user.username,
      },
    });
    return transaction;
  }
}
