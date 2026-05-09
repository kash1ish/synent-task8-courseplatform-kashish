import express from "express";
import { createLesson } from "../controllers/lessonController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createLesson);

export default router;
