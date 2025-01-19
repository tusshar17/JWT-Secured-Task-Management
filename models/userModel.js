import mongoose, { mongo } from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

// Model
const UserModel = mongoose.model("user", UserSchema)

export default UserModel