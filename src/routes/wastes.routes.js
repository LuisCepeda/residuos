import { Router } from "express";
import {
  getWaste,
  getWastes,
  createWaste,
  updateWaste,
  deleteWaste,
} from "../controllers/wastes.controllers.js";

const router = Router();

router.get("/wastes", getWastes);

router.get("/wastes/:id", getWaste);

router.post("/wastes", createWaste);

router.put("/wastes/:id", updateWaste);

router.delete("/wastes/:id", deleteWaste);

export default router;
