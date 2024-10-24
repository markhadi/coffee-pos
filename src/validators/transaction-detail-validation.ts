import { z } from "zod";
import {
  maximumString,
  minimumString,
  nonnegative,
} from "./validation-message";

export class TransactionDetailValidation {
  static readonly CREATE = z.object({
    transaction_id: z
      .string()
      .min(10, { message: minimumString(10, "Transaction ID") })
      .max(10, { message: maximumString(10, "Transaction ID") }),
    product_id: z.number(),
    quantity: z.number().nonnegative({ message: nonnegative("Quantity") }),
    amount: z.number().nonnegative({ message: nonnegative("Amount") }),
  });
}
