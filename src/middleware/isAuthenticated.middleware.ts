import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import response from "../utils/response.util";
import config from "../config/config.json";
import { UserJwt } from "../types";
import Session from "../models/Sessions";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    let apiKey = req.headers["x-api-key"];

    if (!token && !apiKey) {
      return response.failed(res, "You are not logged in", 401);
    }

    if (apiKey) {
      const userId = await Session.findOne({
        where: {
          apiKey,
        },
      });

      if (!userId) {
        return response.failed(res, "Invalid API Key", 401);
      }

      req.userId = userId.userId;
      return next();
    }

    if (token) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_SECRET) as UserJwt;
      req.userId = decoded.id;
      next();
    }
  } catch (error) {
    return response.failed(res, "Token is not valid / expired", 401);
  }
};

export default isAuthenticated;
