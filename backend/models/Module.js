import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },

        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        lessons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson",
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Module = mongoose.model("Module", moduleSchema);

export default Module;