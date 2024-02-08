import Joi from "joi";

export const register = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
