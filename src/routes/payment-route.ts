import { Router } from "express";
import { Path } from "../constants/path";
import { PaymentController } from "../controllers/payment-controller";

export const paymentRouter = Router();

paymentRouter.post(Path.CreatePayment, PaymentController.create);
