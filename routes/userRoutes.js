import express from "express"
import UserController from "../controllers/userController.js"


const router = express.Router()

// Public Routes
router.post('/signup', UserController.userRegistration)
router.post('/login', UserController.userLogin)


// Protected Routes


export default router