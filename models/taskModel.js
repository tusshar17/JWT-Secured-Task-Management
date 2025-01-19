import mongoose, { mongo } from "mongoose";


const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false},
        status: { type: Boolean, required: true },
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
    },
    {
        timestamps: true,
    }
)

// Model
const taskModel = mongoose.model("user", UserSchema)

export default taskModelModel