import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async(req, res) => {
    try{
        const { courseId } = req.body;

        if(!courseId){
            return res.status(400).json({
                message: "Course ID is required",
            })
        }

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(500).json({
                message: "Course not found",
            })
        }

        const existingEnrollment = await Enrollment.findOne({
            userId: req.user._id,
            courseId
        })

        if(existingEnrollment){
            return res.status(400).json({
                message: "Already enrolled",
            })
        }

        const enrollment = await Enrollment.create({
            userId: req.user._id,
            courseId,
        })


        res.status(201).json({
            message: "Enrollment Successfull",
            enrollment,
        })
    }catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        })
    }
}