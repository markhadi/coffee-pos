import { z } from "zod";

export class CategoryValidation {
  static readonly CREATE = z.object({
    name: z
      .string()
      .min(1, { message: "Category at least 1 characters long" })
      .max(100, { message: "Category must be 100 characters at most" }),
  });
  static readonly SEARCH = z.object({
    name: z
      .string()
      .max(100, { message: "Category must be 100 characters at most" })
      .optional(),
    cursor: z.number().optional(),
  });
  static readonly UPDATE = z.object({
    id: z.number(),
    name: z
      .string()
      .min(1, { message: "Category at least 1 characters long" })
      .max(100, { message: "Category must be 100 characters at most" }),
  });
}
