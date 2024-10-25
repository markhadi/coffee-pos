import { User } from "@prisma/client";
import { generateToken, TokenType } from "../utilities";

export const role = ["ADMIN", "CASHIER"] as const;

type Role = (typeof role)[number];

export type UserResponse = {
  username: string;
  name: string;
  role: string;
  created_at: Date;
  updated_at: Date;
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

export type SearchUserRequest = {
  search?: string;
  size?: number;
  cursor?: string;
};

export type UpdateUserRequest = Omit<CreateUserRequest, "password"> & {
  password?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    username: user.username,
    name: user.name,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}

export function tokenizeUser(user: User, tokenType: TokenType): string {
  const userResponse = toUserResponse(user);
  const token = generateToken(userResponse, tokenType);
  return token;
}
