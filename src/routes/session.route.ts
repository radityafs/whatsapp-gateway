import { Router } from "express";

const router = Router();

router.post("/session");
router.get("/session");
router.get("/session/:id");
router.delete("/session/:id");

export default router;
