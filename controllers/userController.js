import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import {doHash, doHashValidation} from "../utils/hashing.js";


class UserController {
    static userRegistration = async (req, res) => {
        const {name, email, password, confirm_password} = req.body
        // check if email already used
        const user = await UserModel.findOne({email:email})
        if (user) {
            return res.status(400).json({
                    "status": "failed",
                    "error": "Email already in use."
                })
        } else {
            if (name && email && password && confirm_password) {
                if (password === confirm_password) {
                    const hashedPassword = await doHash(password, 10)
                    const newUser = new UserModel({
                        name,
                        email,
                        password: hashedPassword
                    })
                    const result = await newUser.save()
                    // Generate JWT
                    const saved_user = await UserModel.findOne({email:email})
                    const token = jwt.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
                    result.password = undefined // Password will be not sent in response body
                    res.status(201).json({
                        "status": "successful",
                        "message": "SignUp Successful.",
                        "token": token
                    })
                } else {
                res.status(400).json({
                    "status": "failed",
                    "error": "Password and Confirm password are not matching."
                })
                }
            } else {
                res.status(400).json({
                    "status": "failed",
                    "error": "All fields must be provided."
                })
            }
        }
    }

    static userLogin = async (req, res) => {
        try {
            const {email, password} = req.body
            if (email && password) {
                const user = await UserModel.findOne({email:email})
                if (!user) {
                    // User not found
                    res.status(404).json({
                        "status": "failed",
                        "message": "User does not exists."
                    })
                } else {
                    // User found, hence verify password
                    const isMatch = await doHashValidation(password, user.password)
                    // Generate JWT
                    const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
                    if (isMatch) {
                        res.status(200).json({
                            "status": "successful",
                            "message": "Login successful.",
                            "token": token
                        })
                    } else {
                        res.status(400).json({
                            "status": "failed",
                            "message": "Invalid login credentials."
                        })
                    }
                }
            } else {
                res.status(400).json({
                    "status": "failed",
                    "error": "All fields must be provided."
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController