import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import response from "../utils/response.util";

type RequestProperty = "params" | "query" | "body" | "headers";

const validate = (
  schema: Joi.ObjectSchema<any>,
  property: RequestProperty = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details
        .map((i: Joi.ValidationErrorItem) => i.message)
        .join(",");
      return response.failed(res, message);
    }
  };
};

export default validate;
