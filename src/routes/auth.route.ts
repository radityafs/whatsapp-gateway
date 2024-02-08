import { Router } from "express";
import validate from "../middleware/validator.middleware";
import {
  register as RegisterSchema,
  login as LoginSchema,
} from "../validator/auth.validator";
import { login, register } from "../controllers/auth.controllers";
const router = Router();

router.post("/login", validate(LoginSchema), login);
router.post("/register", validate(RegisterSchema), register);

export default router;
