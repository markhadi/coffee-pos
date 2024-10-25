import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  LoginUserRequest,
  RefreshUserRequest,
  SearchUserRequest,
  UpdateUserRequest,
} from "../models/user-model";
import { UserService } from "../services/user-service";
import { UserRequest } from "../types/user-request";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.create(request);
      res.status(201).json({
        data: response.access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.cookie("refresh_token", response.refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1d
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
      });
      res.status(200).json({
        data: response.access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RefreshUserRequest = {
        cookie: req.cookies["refresh_token"],
      } as RefreshUserRequest;
      const response = await UserService.refresh(request);
      res.status(200).json({
        data: response.access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SearchUserRequest = {
        search: req.query?.search,
        size: req.query?.size ? Number(req.query.size) : undefined,
        cursor: req.query?.cursor,
      } as SearchUserRequest;
      const response = await UserService.search(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      request.username = req.params.username;
      const response = await UserService.update(request);
      if (response.username === request.username) {
        res.clearCookie("refresh_token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "development" ? false : true,
          sameSite: process.env.NODE_ENV === "development" ? false : "none",
        });
      }
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = req.params.username;
      const response = await UserService.remove(username);
      if (response.username === username) {
        res.clearCookie("refresh_token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "development" ? false : true,
          sameSite: process.env.NODE_ENV === "development" ? false : "none",
        });
      }
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
