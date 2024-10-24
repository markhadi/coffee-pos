import { z } from "zod";
import { maximumString, minimumString } from "./validation-message";

export class PaymentValidation {
  static readonly CREATE = z.object({
    name: z
      .string()
      .min(1, { message: minimumString(1, "Name") })
      .max(100, { message: maximumString(100, "Name") }),
    description: z
      .string()
      .min(1, { message: minimumString(1, "Description") })
      .max(100, { message: maximumString(100, "Description") }),
    is_active: z.boolean(),
  });
  static readonly SEARCH = z.object({
    search: z
      .string()
      .max(100, { message: maximumString(100, "Search") })
      .optional(),
    size: z.number().optional(),
    cursor: z.number().optional(),
  });
}

// model PaymentMethod {
//     id                  Int      @id @default(autoincrement())
//     name                String   @unique @db.VarChar(100)
//     description         String?  @db.Text
//     is_active           Boolean  @default(true)
//     created_at          DateTime @default(now())
//     updated_at          DateTime @updatedAt
//     created_by_username String   @db.VarChar(100)
//     updated_by_username String   @db.VarChar(100)

//     created_by User @relation("payment_method_created_by", fields: [created_by_username], references: [username])
//     updated_by User @relation("payment_method_updated_by", fields: [updated_by_username], references: [username])

//     @@map("payment_methods")
//   }
