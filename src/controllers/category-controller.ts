import { NextFunction, Request, Response } from "express";
import {
  CreateCategoryRequest,
  SearchCategoryRequest,
  UpdateCategoryRequest,
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
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
      request.id = Number(req.params.id);
      const response = await CategoryService.update(request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await CategoryService.remove(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async list(_: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.list();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
