import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { CreateUserRequest, LoginUserRequest } from "../models/user-model";

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
      const request = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.cookie("refresh_token", response.refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1d
        // secure: true,
        // sameSite: 'none',
      });
      res.status(200).json({
        data: response.access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}
