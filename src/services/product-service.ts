import { User } from "@prisma/client";
import { prismaClient } from "../apps/database";
import {
  CreateProductRequest,
  ProductResponse,
  ProductResponseCategoryIncluded,
  SearchProductRequest,
  UpdateProductRequest,
} from "../models/product-model";
import { ProductValidation } from "../validators/product-validation";
import { Validation } from "../validators/validation";
import { CategoryService } from "./category-service";
import { Pageable } from "../models/page";
import { ResponseError } from "../errors/response-error";

export class ProductService {
  static async create(
    user: User,
    request: CreateProductRequest
  ): Promise<ProductResponse> {
    const createRequest = Validation.validate(
      ProductValidation.CREATE,
      request
    );
    await CategoryService.isCategoryExists(createRequest.category_id);
    const product = await prismaClient.product.create({
      data: {
        ...createRequest,
        price: createRequest.price,
        created_by_username: user.username,
        updated_by_username: user.username,
      },
    });
    return product;
  }
  static async search(
    request: SearchProductRequest
  ): Promise<Pageable<ProductResponseCategoryIncluded>> {
    const searchRequest = Validation.validate(
      ProductValidation.SEARCH,
      request
    );
    const filters: any[] = [];
    let orderBy = { id: "desc" as const };
    if (searchRequest.search) {
      filters.push({
        OR: [
          {
            name: {
              contains: searchRequest.search,
            },
          },
          {
            code: {
              contains: searchRequest.search,
            },
          },
        ],
      });
    }
    const take = searchRequest.size || 10;
    const cursor = searchRequest.cursor
      ? { id: Number(searchRequest.cursor) }
      : undefined;
    const products = await prismaClient.product.findMany({
      where: {
        AND: filters,
      },
      include: {
        category: true,
      },
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor,
      orderBy,
    });
    const hasMore = products.length === take + 1;
    if (hasMore) {
      products.pop();
    }
    const nextCursor =
      products.length === take ? products[products.length - 1].id : undefined;
    return {
      data: products,
      paging: {
        total: products.length,
        cursor: nextCursor,
        hasMore,
      },
    };
  }
  static async isProductExists(id: number): Promise<ProductResponse> {
    const product = await prismaClient.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new ResponseError(404, "Product is not found");
    }
    return product;
  }
  static async update(
    user: User,
    request: UpdateProductRequest
  ): Promise<ProductResponse> {
    const updateRequest = Validation.validate(
      ProductValidation.UPDATE,
      request
    );
    await this.isProductExists(updateRequest.id);
    await CategoryService.isCategoryExists(updateRequest.category_id);
    const product = await prismaClient.product.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        ...updateRequest,
        updated_by_username: user.username,
      },
    });
    return product;
  }
}
