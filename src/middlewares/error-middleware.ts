import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../errors/response-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JsonWebTokenError } from "jsonwebtoken";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      errors: error.message,
    });
  } else if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      res.status(400).json({
        errors:
          "The operation failed because a conflicting data constraint was encountered",
      });
    } else {
      res.status(400).json({ errors: error.message });
    }
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
