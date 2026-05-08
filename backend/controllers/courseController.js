import Course from "../models/Course.js"

export const createCourse = async(req, res) =>{
    try{
        
        const {title, description, price, thumbnail } = req.body;

        if(!title || !description || !price){
            return res.status(400).json({
                message: "Please fill all required fields",
            })
        }

        const course = await Course.create({
            title, 
            description,
            price,
            thumbnail,


            createdBy: req.user._id,
        })

        res.status(201).json({
            message: "Course created successfully",
        })
    }catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        })
    }
}

export const getAllCourses = async(req, res) => {
    try{

        const courses = await Course.find()
        .populate("createdBy", "name email")
        .sort({ createdAt: -1})

        res.status(200).json(courses);
    }catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}