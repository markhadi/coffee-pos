import { z } from "zod";

export class CategoryValidation {
  static readonly CREATE = z.object({
    name: z
      .string()
      .min(1, { message: "Username at least 1 characters long" })
      .max(100, { message: "Username must be 100 characters at most" }),
  });
}
