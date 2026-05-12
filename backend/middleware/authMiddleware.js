import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";

export const protect = async(req, res, next) =>{
    let token;

    try{
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        else{
            return res.status(401).json({
                message: "Not authorized, no token"
            })
        }
    }catch(error){
        return res.status(401).json({
            message: "Not authorized, token failed"
        })
    }
}

export const adminOnly = async(req, res, next) =>{
    if(req.user && req.user.role === 'admin'){
        
        next();
    }else{
        return res.status(403).json({
            message: "Admin access only",
        })
    }
}

export const isEnrolled = async(req, res, next) =>{
    try{
        const courseId = req.params.courseId;

        const enrollment = await Enrollment.findOne({
            userId: req.user._id,
            courseId,
        })

        if(!enrollment){
            return res.status(403).json({
                message: "Access denied. Please enroll"
            })
        }

        next();
    }catch(error){
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}