import { Prisma } from "@prisma/client";
import { prismaClient } from "../apps/database";
import {
  CreateTransactionDetailRequest,
  TransactionDetailResponse,
} from "../models/transaction-detail-model";
import { TransactionDetailValidation } from "../validators/transaction-detail-validation";
import { Validation } from "../validators/validation";
import { ProductService } from "./product-service";
import { TransactionService } from "./transaction-service";
import { logger } from "../apps/logging";

export class TransactionDetailService {
  static async create(
    request: CreateTransactionDetailRequest,
    tx: Prisma.TransactionClient
  ): Promise<TransactionDetailResponse> {
    const product = await ProductService.get(request.product_id, tx);
    await TransactionService.isTransactionExists(request.transaction_id, tx);
    const transaction = await tx.productTransactionDetail.create({
      data: {
        ...request,
        product_name: product.name,
        product_price: product.price,
        product_category_id: product.category.id,
        product_category_name: product.category.name,
      },
    });
    return transaction;
  }
}
