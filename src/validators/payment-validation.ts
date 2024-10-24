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
  static readonly UPDATE = z.object({
    id: z.number(),
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
}
