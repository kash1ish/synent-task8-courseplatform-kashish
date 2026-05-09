import express from "express";
import { createCourse, getAllCourses, getSingleCourse, updateCourse, deleteCourse} from "../controllers/courseController.js";
import { protect , adminOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id",getSingleCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.post("/", protect, adminOnly, createCourse);
router.delete("/:id",protect, adminOnly, deleteCourse);

export default router;