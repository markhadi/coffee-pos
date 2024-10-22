import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { errorMiddleware } from "../middlewares/error-middleware";
import { privateRouter } from "../routes/private";
import { publicRouter } from "../routes/public";

export const web = express();
export const httpServer = http.createServer(web);

web.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" ? true : "https://yourwebsite.com",
    credentials: true,
  })
);

web.use(cookieParser());
web.use(express.json());
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);
