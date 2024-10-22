import { z } from "zod";
import { role } from "../models/user-model";
import { generateRoleMessage } from "../utilities";

export class UserValidation {
  static readonly CREATE = z.object({
    username: z
      .string()
      .min(4, { message: "Username at least 4 characters long" })
      .max(100, { message: "Username must be 100 characters at most" }),
    password: z
      .string()
      .min(4, { message: "Password at least 4 characters long" })
      .max(100, { message: "Password must be 100 characters at most" }),
    name: z
      .string()
      .min(4, { message: "Name at least 4 characters long" })
      .max(100, { message: "Name must be 100 characters at most" }),
    role: z.enum(role, { message: generateRoleMessage(role) }),
  });
  static readonly LOGIN = z.object({
    username: z
      .string()
      .min(4, { message: "Username at least 4 characters long" })
      .max(100, { message: "Username must be 100 characters at most" }),
    password: z
      .string()
      .min(4, { message: "Password at least 4 characters long" })
      .max(100, { message: "Password must be 100 characters at most" }),
  });
}
// export type CreateUserRequest = {
//     username: string;
//     name: string;
//     password: string;
//     role: Role;
//   };
