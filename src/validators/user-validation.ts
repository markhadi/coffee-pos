import { z } from "zod";
import { role } from "../models/user-model";
import {
  maximumString,
  minimumString,
  roleMessage,
} from "./validation-message";

export class UserValidation {
  static readonly CREATE = z.object({
    username: z
      .string()
      .min(4, { message: minimumString(4, "Username") })
      .max(100, { message: maximumString(100, "Username") }),
    password: z
      .string()
      .min(4, { message: minimumString(4, "Password") })
      .max(100, { message: maximumString(100, "Password") }),
    name: z
      .string()
      .min(4, { message: minimumString(4, "Name") })
      .max(100, { message: maximumString(100, "Name") }),
    role: z.enum(role, { message: roleMessage(role) }),
  });
  static readonly LOGIN = z.object({
    username: z
      .string()
      .min(4, { message: minimumString(4, "Username") })
      .max(100, { message: maximumString(100, "Username") }),
    password: z
      .string()
      .min(4, { message: minimumString(4, "Password") })
      .max(100, { message: maximumString(100, "Password") }),
  });
  static readonly SEARCH = z.object({
    search: z
      .string()
      .max(100, { message: maximumString(100, "Username") })
      .optional(),
    size: z.number().optional(),
    cursor: z.string().optional(),
  });
  static readonly UPDATE = z.object({
    username: z
      .string()
      .min(4, { message: minimumString(4, "Username") })
      .max(100, { message: maximumString(100, "Username") }),
    password: z
      .string()
      .max(100, { message: maximumString(100, "Password") })
      .optional()
      .refine((val) => !val || val.length >= 4, {
        message: minimumString(4, "Password"),
      }),
    name: z
      .string()
      .min(4, { message: minimumString(4, "Name") })
      .max(100, { message: maximumString(100, "Name") }),
    role: z.enum(role, { message: roleMessage(role) }),
  });
}
