// model ProductTransaction {
//     transaction_id    String   @id @db.VarChar(10)
//     customer_name     String   @db.VarChar(100)
//     total_quantity    Int
//     total_amount      Int
//     payment_method_id Int
//     payment_method    String   @db.VarChar(100)
//     username          String   @db.VarChar(100)
//     service_by        String   @db.VarChar(100)
//     service_charge    Int
//     issued_at         DateTime @default(now())
//     details ProductTransactionDetail[]

//     @@map("product_transactions")
//   }

import { z } from "zod";
import {
  minimumString,
  maximumString,
  nonnegative,
} from "./validation-message";
import { TransactionDetailValidation } from "./transaction-detail-validation";

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
}

// interface OrderConfirmationProps {
//     isOpen: boolean;
//     onClose: () => void;
//     cartItems: {
//       id: number; -> transaction_id
//       name: string; -> product_id
//       quantity: number; -> quantity
//       price: number; -> amount
//     }[];
//     customer: string;
//     paymentMethod: string;
//     subtotal: number;
//     serviceCharge: number;
//     serviceChargeAmount: number;
//     totalAmount: number;
//   }
