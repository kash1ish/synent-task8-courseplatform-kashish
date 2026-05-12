import razorpay from "../config/razorpay.js"

import Course from "../models/Course.js"

export const createOrder = async (
  req,
  res
) => {

  try {

    const { courseId } = req.body

    const course = await Course.findById(
      courseId
    )

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      })
    }

    const options = {
      amount: course.price * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,
    }

    const order =
      await razorpay.orders.create(options)

    res.status(200).json(order)

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    })

  }

}