import express from "express";
import { createModule } from "../controllers/moduleController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, adminOnly, createModule);

export default router;