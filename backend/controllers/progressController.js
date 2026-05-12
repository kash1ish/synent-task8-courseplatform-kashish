import Progress from "../models/Progress.js"
import Lesson from "../models/Lesson.js"
import Module from "../models/Module.js"

export const markLessonComplete = async (req, res) => {

  try {

    const { lessonId, courseId } = req.body

    if (!lessonId || !courseId) {
      return res.status(400).json({
        message:
          "lessonId and courseId required",
      })
    }

    const lesson = await Lesson.findById(
      lessonId
    )

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      })
    }

    let progress = await Progress.findOne({
      userId: req.user._id,
      courseId,
    })

    if (!progress) {

      progress = await Progress.create({
        userId: req.user._id,
        courseId,
        completedLessons: [],
      })

    }

    const alreadyCompleted =
      progress.completedLessons.includes(
        lessonId
      )

    if (!alreadyCompleted) {

      progress.completedLessons.push(
        lessonId
      )

    }

    const modules = await Module.find({
      courseId,
    }).populate("lessons")

    let totalLessons = 0

    modules.forEach((module) => {
      totalLessons += module.lessons.length
    })

    progress.progressPercentage =
      (
        progress.completedLessons.length /
        totalLessons
      ) * 100

    await progress.save()

    res.status(200).json({
      message:
        "Lesson marked complete",

      progress,
    })

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    })

  }

}

export const getCourseProgress = async (
  req,
  res
) => {

  try {

    const progress = await Progress.findOne({
      userId: req.user._id,

      courseId: req.params.courseId,
    })

    if (!progress) {

      return res.status(200).json({
        completedLessons: [],
        progressPercentage: 0,
      })

    }

    res.status(200).json(progress)

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    })

  }

}