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
    payment_method: z
      .string()
      .max(100, { message: maximumString(100, "Payment Method Name") })
      .optional(),
    service_charge: z
      .number()
      .nonnegative({ message: nonnegative("Service Charge") }),
  });
}

// interface OrderConfirmationProps {
//     isOpen: boolean;
//     onClose: () => void;
//     cartItems: {
//       id: number;
//       name: string;
//       quantity: number;
//       price: number;
//     }[];
//     customer: string;
//     paymentMethod: string;
//     subtotal: number;
//     serviceCharge: number;
//     serviceChargeAmount: number;
//     totalAmount: number;
//   }
