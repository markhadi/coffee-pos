import { User } from "@prisma/client";
import { prismaClient } from "../apps/database";
import { CreateProductRequest, ProductResponse } from "../models/product-model";
import { ProductValidation } from "../validators/product-validation";
import { Validation } from "../validators/validation";
import { CategoryService } from "./category-service";

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
}
