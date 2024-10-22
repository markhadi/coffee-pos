import { User } from "@prisma/client";
import { generateToken, TokenType } from "../utilities";

export const role = ["ADMIN", "CASHIER"] as const;

type Role = (typeof role)[number];

export type UserResponse = {
  username: string;
  name: string;
  role: string;
};

export type UserTokenResponse = {
  access_token: string;
  refresh_token?: string;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
  role: Role;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type RefreshUserRequest = {
  cookie: string;
};

export type UpdateUserCurrentRequest = {
  name?: string;
  password?: string;
  currentPassword: string;
};

export type UpdateUserRequest = {
  username: string;
  name?: string;
  password?: string;
  role?: Role;
};

export type SearchUserRequest = {
  search?: string;
  cursor?: number;
};

function toUserResponse(user: User): UserResponse {
  return {
    username: user.username,
    name: user.name,
    role: user.role,
  };
}

export function tokenizeUser(user: User, tokenType: TokenType): string {
  const userResponse = toUserResponse(user);
  const token = generateToken(userResponse, tokenType);
  return token;
}
