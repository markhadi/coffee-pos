import bcrypt from "bcrypt";
import { prismaClient } from "../apps/database";
import { ResponseError } from "../errors/response-error";
import { Pageable } from "../models/page";
import {
  CreateUserRequest,
  LoginUserRequest,
  RefreshUserRequest,
  SearchUserRequest,
  tokenizeUser,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
  UserTokenResponse,
} from "../models/user-model";
import {
  decryptCursor,
  encryptCursor,
  generateToken,
  verifyToken,
} from "../utilities";
import { UserValidation } from "../validators/user-validation";
import { Validation } from "../validators/validation";
import { logger } from "../apps/logging";

export class UserService {
  static async create(request: CreateUserRequest): Promise<UserTokenResponse> {
    const createRequest = Validation.validate(UserValidation.CREATE, request);
    const countSameUsername = await prismaClient.user.count({
      where: {
        username: createRequest.username,
      },
    });
    if (countSameUsername != 0) {
      throw new ResponseError(400, "Username is already exists");
    }
    createRequest.password = await bcrypt.hash(createRequest.password, 10);
    const user = await prismaClient.user.create({
      data: createRequest,
    });
    return { access_token: tokenizeUser(user, "access") };
  }
  static async login(request: LoginUserRequest): Promise<UserTokenResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);
    const result = await prismaClient.$transaction(async (tx) => {
      let user = await tx.user.findUnique({
        where: {
          username: loginRequest.username,
        },
      });
      if (!user) {
        throw new ResponseError(401, "Username or password is incorrect");
      }
      const isPasswordValid = await bcrypt.compare(
        loginRequest.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password is incorrect");
      }
      const accessToken = tokenizeUser(user, "access");
      const refreshToken = tokenizeUser(user, "refresh");
      user = await tx.user.update({
        where: {
          username: loginRequest.username,
        },
        data: {
          refresh_token: refreshToken,
        },
      });
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    });
    return result;
  }
  static async refresh(
    request: RefreshUserRequest
  ): Promise<UserTokenResponse> {
    const refreshToken = request.cookie;
    if (!refreshToken) {
      throw new ResponseError(401, "No refresh token provided");
    }
    const user = await prismaClient.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      throw new ResponseError(401, "Invalid refresh token");
    }
    await verifyToken(refreshToken, "refresh");
    const accessToken = tokenizeUser(user, "access");
    return {
      access_token: accessToken,
    };
  }
  static async search(
    request: SearchUserRequest
  ): Promise<Pageable<UserResponse>> {
    const searchRequest = Validation.validate(UserValidation.SEARCH, request);
    const filters: any[] = [];
    let orderBy = { updated_at: "desc" as const };
    if (searchRequest.search) {
      filters.push({
        OR: [
          {
            username: {
              contains: searchRequest.search,
            },
          },
          {
            name: {
              contains: searchRequest.search,
            },
          },
        ],
      });
    }
    const take = searchRequest.size || 10;
    const cursor = searchRequest.cursor
      ? { username: decryptCursor(searchRequest.cursor) }
      : undefined;
    const users = await prismaClient.user.findMany({
      where: {
        AND: filters,
      },
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor,
      orderBy,
    });
    const hasMore = users.length === take + 1;
    if (hasMore) {
      users.pop();
    }
    const nextCursor =
      users.length === take
        ? encryptCursor(users[users.length - 1].username)
        : undefined;
    return {
      data: users.map(toUserResponse),
      paging: {
        total: users.length,
        cursor: nextCursor,
        hasMore,
      },
    };
  }
  static async update(request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    const result = await prismaClient.$transaction(async (tx) => {
      let user = await tx.user.findUnique({
        where: { username: updateRequest.username },
      });
      if (!user) {
        throw new ResponseError(404, "User is not found");
      }
      if (updateRequest.password) {
        updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
      } else {
        updateRequest.password = user.password;
      }
      user = await tx.user.update({
        where: {
          username: user.username,
        },
        data: {
          ...updateRequest,
          refresh_token: null,
        },
      });
      return user;
    });
    return toUserResponse(result);
  }
}
