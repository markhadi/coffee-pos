import { PaymentMethod } from "@prisma/client";

export type PaymentMethodResponse = PaymentMethod;

export type CreatePaymentMethodRequest = {
  name: string;
  description?: string;
  is_active: boolean;
};

export type SearchPaymentMethodRequest = {
  search?: string;
  size?: number;
  cursor?: number;
};

export type UpdatePaymentMethodRequest = CreatePaymentMethodRequest & {
  id: number;
};
