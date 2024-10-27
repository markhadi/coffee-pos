import { z } from "zod";
import {
  maximumString,
  minimumString,
  nonnegative,
} from "./validation-message";

export class TransactionValidation {
  static readonly CREATE = z.object({
    customer_name: z
      .string()
      .min(1, { message: minimumString(1, "Customer Name") })
      .max(100, { message: maximumString(100, "Customer Name") }),
    total_quantity: z.number().nonnegative({
      message: nonnegative("Total Quantity"),
    }),
    total_amount: z.number().nonnegative({
      message: nonnegative("Total Amount"),
    }),
    payment_method_id: z.number(),
    service_charge: z
      .number()
      .nonnegative({ message: nonnegative("Service Charge") }),
    transaction_items: z.array(
      z.object({
        product_id: z.number(),
        quantity: z.number().nonnegative({ message: nonnegative("Quantity") }),
        amount: z.number().nonnegative({ message: nonnegative("Amount") }),
      })
    ),
  });
  static readonly SEARCH = z.object({
    size: z.number().optional(),
    cursor: z.string().optional(),
  });
  static readonly SALESBYDATERANGE = z.object({
    from: z.string().refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Invalid date format",
      }
    ),
    to: z.string().refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Invalid date format",
      }
    ),
  });
}
