import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateProductRequest } from "../models/product-model";
import { ProductService } from "../services/product-service";

export class ProductController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateProductRequest = req.body as CreateProductRequest;
      const response = await ProductService.create(req.user!, request);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
