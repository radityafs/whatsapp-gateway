import { Router } from "express";
import {
  createSession,
  deleteSession,
  getSession,
  getSessions,
} from "../controllers/session.controllers";
import isAuthenticated from "../middleware/isAuthenticated.middleware";

const router = Router();

router.post("/create", isAuthenticated, createSession);
router.get("/all", isAuthenticated, getSessions);
router.get("/detail/:id", isAuthenticated, getSession);
router.delete("/delete/:id", isAuthenticated, deleteSession);

export default router;
