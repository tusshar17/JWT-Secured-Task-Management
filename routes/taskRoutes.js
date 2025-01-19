import express from "express"
import TaskController from "../controllers/taskController.js"
import { userIdentifier } from "../middlewares/auth-middleware.js"


const router = express.Router()

// Protected Routes
router.get('/', userIdentifier, TaskController.getTasks)
router.get('/:id', userIdentifier, TaskController.getTaskByID)
router.post('/', userIdentifier, TaskController.createTask)
router.put('/:id', userIdentifier, TaskController.updateTaskByID)
router.delete('/:id', userIdentifier, TaskController.deleteTaskByID)

export default router