import express from "express"

import {
  markLessonComplete,
} from "../controllers/progressController.js"

import {
  protect,
} from "../middleware/authMiddleware.js"

import {
  markLessonComplete,
  getCourseProgress,
} from "../controllers/progressController.js"

const router = express.Router()

router.post(
  "/complete",
  protect,
  markLessonComplete
)

router.get(
  "/:courseId",

  protect,

  getCourseProgress
)

export default router