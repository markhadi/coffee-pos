import { Prisma, User } from "@prisma/client";
import { prismaClient } from "../apps/database";
import { ResponseError } from "../errors/response-error";
import { TransactionDetailResponse } from "../models/transaction-detail-model";
import {
  CreateTransactionRequest,
  TransactionResponse,
} from "../models/transaction-model";
import { generateTransactionId } from "../utilities";
import { TransactionValidation } from "../validators/transaction-validation";
import { Validation } from "../validators/validation";
import { PaymentService } from "./payment-service";
import { TransactionDetailService } from "./transaction-detail-service";

export class TransactionService {
  static async create(
    user: User,
    request: CreateTransactionRequest
  ): Promise<
    TransactionResponse & {
      transaction_items: TransactionDetailResponse[];
    }
  > {
    const createRequest = Validation.validate(
      TransactionValidation.CREATE,
      request
    );
    const {
      transaction_items: transactionDetailRequests,
      ...transactionRequest
    } = createRequest;
    const payment = await PaymentService.isPaymentMethodExists(
      transactionRequest.payment_method_id
    );
    const transactionId = generateTransactionId();
    const result = await prismaClient.$transaction(async (tx) => {
      // create transaction
      const transaction = await tx.productTransaction.create({
        data: {
          ...transactionRequest,
          payment_method: payment.name,
          transaction_id: transactionId,
          service_by: user.username,
          username: user.username,
        },
      });
      // create transaction detail
      const transactionDetails = await Promise.all(
        transactionDetailRequests.map(
          async (transactionDetailRequest) =>
            await TransactionDetailService.create(
              {
                ...transactionDetailRequest,
                transaction_id: transaction.transaction_id,
              },
              tx
            )
        )
      );
      return { ...transaction, transaction_items: transactionDetails };
    });
    return result;
  }
  static async isTransactionExists(
    transaction_id: string,
    tx: Prisma.TransactionClient
  ): Promise<TransactionResponse> {
    const transaction = await tx.productTransaction.findUnique({
      where: {
        transaction_id,
      },
    });
    if (!transaction) {
      throw new ResponseError(404, "Transaction is not found");
    }
    return transaction;
  }
  static async getTodaySales(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalSales = await prismaClient.productTransaction.aggregate({
      _sum: {
        total_amount: true,
      },
      where: {
        issued_at: {
          gte: today,
        },
      },
    });
    return totalSales._sum.total_amount || 0;
  }
  static async countToday(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = await prismaClient.productTransaction.count({
      where: {
        issued_at: {
          gte: today,
        },
      },
    });
    return count;
  }
  static async getAverage(): Promise<number> {
    const average = await prismaClient.productTransaction.aggregate({
      _avg: {
        total_amount: true,
      },
    });
    return average._avg.total_amount || 0;
  }
}
