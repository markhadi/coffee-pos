import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../types/user-request";
import {
  CreateProductRequest,
  SearchProductRequest,
  UpdateProductRequest,
} from "../models/product-model";
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
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SearchProductRequest = {
        search: req.query?.search,
        size: req.query?.size ? Number(req.query.size) : undefined,
        cursor: req.query?.cursor ? Number(req.query.cursor) : undefined,
      } as SearchProductRequest;
      const response = await ProductService.search(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateProductRequest = req.body as UpdateProductRequest;
      request.id = Number(req.params.id);
      const response = await ProductService.update(req.user!, request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await ProductService.remove(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
