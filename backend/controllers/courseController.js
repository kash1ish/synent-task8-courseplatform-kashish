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

export const getSingleCourse = async(req, res) =>{
    try{

        const course = await Course.findById(req.params.id)
        .populate("createdBy","name email")

        if(!course){
            return res.status(400).json({
                message: "Course not found",
            })
        }

        res.status(200).json(course)
    }catch(error){
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        })
    }
}

export const updateCourse = async(req, res)=>{
    try{
        const {title, description, price, thumbnail } = req.body;
        const course = await Course.findById(req.params.id);

        if(!course){
            return res.status(404).json({
                message: "Course not found",
            })
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.price = price || course.price;
        course.thumbnail = thumbnail || course.thumbnail;

        const updatedCourse = await course.save();

        res.status(200).json({
            message: "Course updated successfully",
            updatedCourse,
        })
    }catch(error){
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        })
    }
}

export const deleteCourse = async(req,res) =>{
    try{
        const course = await Course.findById(req.params.id);

        if(!course){
            return res.status(404).json({
                message: "Course not found",
            })
        }

        await course.deleteOne();

        res.status(200).json({
            message: "Course deleted successfully",
        })
    }catch(error){
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        })
    }
}