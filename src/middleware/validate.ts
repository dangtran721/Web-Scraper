import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import httpStatus from "http-status";
import ApiError from "../utils/apiError";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      Object.assign(req, validatedData);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((details) => `${details.message} (${details.path.join(".")})`)
          .join(", "); // customize error message

        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
      return next(error);
    }
  };

export default validate;
