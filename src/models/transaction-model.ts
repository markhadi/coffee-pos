import { ProductTransaction } from "@prisma/client";

export type TransactionResponse = ProductTransaction;

export type CreateTransactionRequest = {
  customer_name: string;
  total_quantity: number;
  total_amount: number;
  payment_method_id: number;
  payment_method: string;
  service_charge: number;
};
// static readonly CREATE = z.object({
//     customer_name: z
//       .string()
//       .min(1, { message: minimumString(1, "Customer Name") })
//       .max(100, { message: maximumString(100, "Customer Name") }),
//     total_quantity: z.number().nonnegative({
//       message: nonnegative("Total Quantity"),
//     }),
//     total_amount: z.number().nonnegative({
//       message: nonnegative("Total Amount"),
//     }),
//     payment_method_id: z.number(),
//     payment_method: z
//       .string()
//       .min(1, { message: minimumString(1, "Payment Method Name") })
//       .max(100, { message: maximumString(100, "Payment Method Name") }),
//     service_charge: z
//       .number()
//       .nonnegative({ message: nonnegative("Service Charge") }),
//   });
