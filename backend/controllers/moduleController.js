import Course from "../models/Course.js";
import Module from "../models/Module.js";

export const createModule = async(req, res) =>{
    try{
        const {title, courseId} = req.body;

        if(!title || !courseId){
            return res.status(400).json({
                message: "Title and courseId are required",
            })
        }

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                message: "Course doesn't exists",
            })
        }

        const module = await Module.create({
            title, 
            courseId,
        })

        course.modules.push(module._id);

        await course.save();

        res.status(201).json({
            message: "Module added successfully",
        })
    }catch(error){
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        })
    }
}