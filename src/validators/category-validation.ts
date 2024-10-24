import { z } from "zod";
import { maximumString, minimumString } from "./validation-message";

export class CategoryValidation {
  static readonly CREATE = z.object({
    name: z
      .string()
      .min(1, { message: minimumString(1, "Name") })
      .max(100, { message: maximumString(100, "Name") }),
  });
  static readonly SEARCH = z.object({
    name: z
      .string()
      .max(100, { message: maximumString(100, "Name") })
      .optional(),
    cursor: z.number().optional(),
  });
  static readonly UPDATE = z.object({
    id: z.number(),
    name: z
      .string()
      .min(1, { message: minimumString(1, "Name") })
      .max(100, { message: maximumString(100, "Name") }),
  });
}
