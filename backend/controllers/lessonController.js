import Lesson from "../models/Lesson.js";
import Module from "../models/Module.js";

export const createLesson = async(req, res) => {
    try{
        const {title, videoUrl, moduleId } = req.body;

        if(!title || !videoUrl || !moduleId){
            return res.status(400).json({
                message: "All fields are required",
            })
        }

        const module = await Module.findById(moduleId);

        if(!module){
            return res.status(404).json({
                message: "Module Not Found",
            })
        }

        const lesson = await Lesson.create({
            title, 
            videoUrl, 
            moduleId,
        })

        module.lessons.push(lesson);

        await module.save();

        res.status(201).json({
            message: "Lesson created successfully",
            lesson,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal Sever Error",
            error: error.message,
        })
    }
}