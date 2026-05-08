import express from "express";
import { createCourse,getAllCourses } from "../controllers/courseController.js";
import { protect , adminOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", protect, adminOnly, createCourse);

export default router;