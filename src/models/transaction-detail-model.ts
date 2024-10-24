import { ProductTransactionDetail } from "@prisma/client";

export type TransactionDetailResponse = ProductTransactionDetail;

export type CreateTransactionDetailRequest = {
  transaction_id: string;
  product_id: number;
  quantity: number;
  amount: number;
};
