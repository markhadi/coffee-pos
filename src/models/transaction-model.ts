import { ProductTransaction } from "@prisma/client";
import { CreateTransactionDetailRequest } from "./transaction-detail-model";

export type TransactionResponse = ProductTransaction;

export type CreateTransactionRequest = {
  customer_name: string;
  total_quantity: number;
  total_amount: number;
  payment_method_id: number;
  service_charge: number;
  transaction_items: Omit<CreateTransactionDetailRequest, "transaction_id">[];
};

export type SearchTransactionRequest = {
  size?: number;
  cursor?: string;
};
