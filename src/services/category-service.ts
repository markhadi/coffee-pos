import { prismaClient } from "../apps/database";
import {
  CategoryResponse,
  CreateCategoryRequest,
} from "../models/category-model";
import { CategoryValidation } from "../validators/category-validation";
import { Validation } from "../validators/validation";

export class CategoryService {
  static async create(
    request: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    const categoryRequest = Validation.validate(
      CategoryValidation.CREATE,
      request
    );
    const category = await prismaClient.category.create({
      data: categoryRequest,
    });
    return category;
  }
}
