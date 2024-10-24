import { Router } from "express";
import { Path } from "../constants/path";
import { PaymentController } from "../controllers/payment-controller";
import { roleMiddleware } from "../middlewares/role-middleware";

export const paymentRouter = Router();

paymentRouter.post(
  Path.CreatePayment,
  roleMiddleware("ADMIN"),
  PaymentController.create
);
paymentRouter.get(
  Path.SearchPayment,
  roleMiddleware("ADMIN"),
  PaymentController.search
);
paymentRouter.put(
  Path.UpdatePayment,
  roleMiddleware("ADMIN"),
  PaymentController.update
);
