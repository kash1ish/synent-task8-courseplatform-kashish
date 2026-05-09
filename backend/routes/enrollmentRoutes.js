import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { enrollCourse } from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/",protect, enrollCourse)

export default router;