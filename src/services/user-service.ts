import bcrypt from "bcrypt";
import { prismaClient } from "../apps/database";
import { ResponseError } from "../errors/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  RefreshUserRequest,
  tokenizeUser,
  UserTokenResponse,
} from "../models/user-model";
import { UserValidation } from "../validators/user-validation";
import { Validation } from "../validators/validation";
import { verifyToken } from "../utilities";

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
}
