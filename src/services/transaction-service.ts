import { Prisma, User } from "@prisma/client";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { prismaClient } from "../apps/database";
import { ResponseError } from "../errors/response-error";
import { Pageable } from "../models/page";
import { TransactionDetailResponse } from "../models/transaction-detail-model";
import {
  CreateTransactionRequest,
  SalesByDateRangeRequest,
  SearchTransactionRequest,
  TransactionResponse,
} from "../models/transaction-model";
import { generateTransactionId } from "../utilities";
import { TransactionValidation } from "../validators/transaction-validation";
import { Validation } from "../validators/validation";
import { PaymentService } from "./payment-service";
import { TransactionDetailService } from "./transaction-detail-service";

export class TransactionService {
  static async create(
    user: User,
    request: CreateTransactionRequest
  ): Promise<
    TransactionResponse & {
      transaction_items: TransactionDetailResponse[];
    }
  > {
    const createRequest = Validation.validate(
      TransactionValidation.CREATE,
      request
    );
    const {
      transaction_items: transactionDetailRequests,
      ...transactionRequest
    } = createRequest;
    const payment = await PaymentService.isPaymentMethodExists(
      transactionRequest.payment_method_id
    );
    const transactionId = generateTransactionId();
    const result = await prismaClient.$transaction(async (tx) => {
      // create transaction
      const transaction = await tx.productTransaction.create({
        data: {
          ...transactionRequest,
          payment_method: payment.name,
          transaction_id: transactionId,
          service_by: user.username,
          username: user.username,
        },
      });
      // create transaction detail
      const transactionDetails = await Promise.all(
        transactionDetailRequests.map(
          async (transactionDetailRequest) =>
            await TransactionDetailService.create(
              {
                ...transactionDetailRequest,
                transaction_id: transaction.transaction_id,
              },
              tx
            )
        )
      );
      return { ...transaction, transaction_items: transactionDetails };
    });
    return result;
  }
  static async isTransactionExists(
    transaction_id: string,
    tx: Prisma.TransactionClient
  ): Promise<TransactionResponse> {
    const transaction = await tx.productTransaction.findUnique({
      where: {
        transaction_id,
      },
    });
    if (!transaction) {
      throw new ResponseError(404, "Transaction is not found");
    }
    return transaction;
  }
  static async getTodaySales(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalSales = await prismaClient.productTransaction.aggregate({
      _sum: {
        total_amount: true,
      },
      where: {
        issued_at: {
          gte: today,
        },
      },
    });
    return totalSales._sum.total_amount || 0;
  }
  static async countToday(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = await prismaClient.productTransaction.count({
      where: {
        issued_at: {
          gte: today,
        },
      },
    });
    return count;
  }
  static async getAverage(): Promise<number> {
    const average = await prismaClient.productTransaction.aggregate({
      _avg: {
        total_amount: true,
      },
    });
    return average._avg.total_amount || 0;
  }
  static async getLast7DaysSales(): Promise<
    { date: string; totalSale: number }[]
  > {
    const today = new Date();
    const dateFormatString = "MM-dd";
    const sevenDaysAgo = subDays(today, 7);
    const dailySales = await prismaClient.productTransaction.groupBy({
      by: ["issued_at"],
      _sum: {
        total_amount: true,
      },
      where: {
        issued_at: {
          gte: sevenDaysAgo,
          lt: today,
        },
      },
    });
    const salesByDay = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, i);
      return {
        date: format(date, dateFormatString),
        totalSale: 0,
      };
    }).reverse();
    dailySales.forEach(({ issued_at, _sum }) => {
      const dayIndex = salesByDay.findIndex(
        (day) => format(new Date(issued_at), dateFormatString) === day.date
      );
      if (dayIndex !== -1) {
        salesByDay[dayIndex].totalSale += _sum.total_amount || 0;
      }
    });
    return salesByDay;
  }
  static async search(
    request: SearchTransactionRequest
  ): Promise<Pageable<TransactionResponse>> {
    const searchRequest = Validation.validate(
      TransactionValidation.SEARCH,
      request
    );
    const filters: any[] = [];
    let orderBy = { issued_at: "desc" as const };
    const take = searchRequest.size || 10;
    const cursor = searchRequest.cursor
      ? { transaction_id: searchRequest.cursor }
      : undefined;
    const transactions = await prismaClient.productTransaction.findMany({
      where: {
        AND: filters,
      },
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor,
      orderBy,
    });
    const hasMore = transactions.length === take + 1;
    if (hasMore) {
      transactions.pop();
    }
    const nextCursor =
      transactions.length === take
        ? transactions[transactions.length - 1].transaction_id
        : undefined;
    return {
      data: transactions,
      paging: {
        total: transactions.length,
        cursor: nextCursor,
        hasMore,
      },
    };
  }
  static async getSalesByDateRange(
    request: SalesByDateRangeRequest
  ): Promise<
    { date: string; totalSales: number; numberOfTransactions: number }[]
  > {
    const salesRequest = Validation.validate(
      TransactionValidation.SALESBYDATERANGE,
      request
    );
    const { from, to } = salesRequest;
    const dailySales = await prismaClient.productTransaction.groupBy({
      by: ["issued_at"],
      _sum: {
        total_amount: true,
      },
      _count: {
        transaction_id: true,
      },
      where: {
        issued_at: {
          gte: new Date(from),
          lt: new Date(to),
        },
      },
    });
    const dateFormatString = "yyyy-MM-dd";
    const salesByDay = eachDayOfInterval({
      start: from,
      end: subDays(to, 1),
    }).map((date) => ({
      date: format(date, dateFormatString),
      totalSales: 0,
      numberOfTransactions: 0,
    }));
    dailySales.forEach(({ issued_at, _sum, _count }) => {
      const dayIndex = salesByDay.findIndex(
        (day) => format(new Date(issued_at), dateFormatString) === day.date
      );
      if (dayIndex !== -1) {
        salesByDay[dayIndex].totalSales += _sum.total_amount || 0;
        salesByDay[dayIndex].numberOfTransactions += _count.transaction_id || 0;
      }
    });
    return salesByDay;
  }
}
