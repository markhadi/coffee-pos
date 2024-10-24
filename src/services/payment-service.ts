import { User } from "@prisma/client";
import {
  CreatePaymentMethodRequest,
  PaymentMethodResponse,
  SearchPaymentMethodRequest,
} from "../models/payment-model";
import { Validation } from "../validators/validation";
import { PaymentValidation } from "../validators/payment-validation";
import { prismaClient } from "../apps/database";
import { Pageable } from "../models/page";

export class PaymentService {
  static async create(
    user: User,
    request: CreatePaymentMethodRequest
  ): Promise<PaymentMethodResponse> {
    const createRequest = Validation.validate(
      PaymentValidation.CREATE,
      request
    );
    const paymentMethod = await prismaClient.paymentMethod.create({
      data: {
        ...createRequest,
        created_by_username: user.username,
        updated_by_username: user.username,
      },
    });
    return paymentMethod;
  }
  static async search(
    request: SearchPaymentMethodRequest
  ): Promise<Pageable<PaymentMethodResponse>> {
    const searchRequest = Validation.validate(
      PaymentValidation.SEARCH,
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
            description: {
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
    const payments = await prismaClient.paymentMethod.findMany({
      where: {
        AND: filters,
      },
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor,
      orderBy,
    });
    const hasMore = payments.length === take + 1;
    if (hasMore) {
      payments.pop();
    }
    const nextCursor =
      payments.length === take ? payments[payments.length - 1].id : undefined;
    return {
      data: payments,
      paging: {
        total: payments.length,
        cursor: nextCursor,
        hasMore,
      },
    };
  }
}
