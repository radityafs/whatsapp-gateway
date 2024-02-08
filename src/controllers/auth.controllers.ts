import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import config from "../config/config.json";
import response from "../utils/response.util";
import UserMapper from "../utils/data/mapping/user.util";
import User from "../models/User";

export const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {
    // Check email
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.failed(res, "User not found", 404);
    }

    // Check password
    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      return response.failed(res, "Invalid password", 400);
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Response
    return response.success(res, "Login success", {
      ...UserMapper(user),
      token,
    });
  } catch (error: any) {
    return response.failed(res, error.message, 500);
  }
};

export const register = async (req: Request, res: Response) => {
  let { name, email, password } = req.body;

  try {
    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);

    // Create user
    const user = await new User({ name, email, password }).save();

    if (!user) {
      return response.failed(res, "Failed to create user", 500);
    }

    // Response
    return response.success(res, "Register success", UserMapper(user));
  } catch (error: any) {
    if (error.message === "Validation error") {
      return response.failed(res, "Email already exists", 400);
    }

    return response.failed(res, error.message, 500);
  }
};
