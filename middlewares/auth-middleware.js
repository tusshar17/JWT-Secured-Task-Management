import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel'

export const userIdentifier = async (req, res, next) => {
    try {
        // Getting token from the header
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startswith("Bearer ")) {
            return res.status(401).json({
                "status": "failed",
                "message": "authentication failed."
            })
        }
        // Extacting token from auth header
        const token = authHeader.split(" ")[1]
        // verifying the token
        const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // Get user from token and attaching it to request
        req.user = await UserModel.findById(userID).select('-password')
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({
            "status": "failed",
            "message": "authentication failed."
        })
    }
}