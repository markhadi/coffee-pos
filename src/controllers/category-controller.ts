import { NextFunction, Request, Response } from "express";
import {
  CreateCategoryRequest,
  SearchCategoryRequest,
} from "../models/category-model";
import { CategoryService } from "../services/category-service";

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const response = await CategoryService.create(request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SearchCategoryRequest = {
        name: req.query?.name,
        size: req.query?.size ? Number(req.query.size) : undefined,
        cursor: req.query?.cursor ? Number(req.query.cursor) : undefined,
      } as SearchCategoryRequest;
      const response = await CategoryService.search(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
