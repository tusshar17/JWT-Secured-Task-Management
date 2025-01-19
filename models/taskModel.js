import mongoose, { mongo } from "mongoose";


const TaskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false},
        status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending"},
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    },
    {
        timestamps: true,
    }
)

// Model
const taskModel = mongoose.model("task", TaskSchema)

export default taskModel