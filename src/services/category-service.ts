import { prismaClient } from "../apps/database";
import { ResponseError } from "../errors/response-error";
import {
  CategoryResponse,
  CreateCategoryRequest,
  SearchCategoryRequest,
  UpdateCategoryRequest,
} from "../models/category-model";
import { Pageable } from "../models/page";
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
  static async search(
    request: SearchCategoryRequest
  ): Promise<Pageable<CategoryResponse>> {
    const searchRequest = Validation.validate(
      CategoryValidation.SEARCH,
      request
    );
    const filters: any[] = [];
    let orderBy = { id: "desc" as const };
    if (searchRequest.name) {
      filters.push({
        name: {
          contains: searchRequest.name,
        },
      });
    }
    const take = searchRequest.size || 10;
    const cursor = searchRequest.cursor
      ? { id: Number(searchRequest.cursor) }
      : undefined;
    const categories = await prismaClient.category.findMany({
      where: {
        AND: filters,
      },
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor,
      orderBy,
    });
    const hasMore = categories.length === take + 1;
    if (hasMore) {
      categories.pop();
    }
    const nextCursor =
      categories.length === take
        ? categories[categories.length - 1].id
        : undefined;
    return {
      data: categories,
      paging: {
        total: categories.length,
        cursor: nextCursor,
        hasMore,
      },
    };
  }
  static async isCategoryExists(id: number): Promise<CategoryResponse> {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new ResponseError(404, "Category is not found");
    }
    return category;
  }
  static async update(
    request: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    const updateRequest = Validation.validate(
      CategoryValidation.UPDATE,
      request
    );
    await this.isCategoryExists(updateRequest.id);
    const category = await prismaClient.category.update({
      where: {
        id: updateRequest.id,
      },
      data: updateRequest,
    });
    return category;
  }
  static async remove(id: number): Promise<CategoryResponse> {
    await this.isCategoryExists(id);
    const category = await prismaClient.category.delete({
      where: {
        id,
      },
    });
    return category;
  }
  static async list(): Promise<Array<CategoryResponse>> {
    const categories = await prismaClient.category.findMany();
    return categories;
  }
}
