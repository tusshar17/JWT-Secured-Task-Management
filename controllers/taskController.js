import taskModel from "../models/taskModel.js"


class TaskController {
    // get all the task with pagination and limit
    static getTasks = async (req, res) => {
        const { page } = req.query
        const tasksPerPage = 10

        try {
            let pageNumber = 0
            if (page <= 1) {
                pageNumber = 0
            } else {
                pageNumber = page - 1
            }
            const result = await taskModel.find({userID: req.user._id})
                    .sort({createdAt: -1})
                    .skip(pageNumber * tasksPerPage)
                    .limit(tasksPerPage)
            res.status(200).json({
                "status": "success",
                "data": result
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "status": "failed",
                "message": "Server Error"
            })
        }
    }

    // create a new task
    static createTask = async (req, res) => {
        try {
            const {title, description, status} = req.body
            // create a new task
            if (title && description && status){
                const task = new taskModel({
                    title,
                    description,
                    status,
                    userID: req.user._id
                })
                await task.save()
                res.status(201).json({
                    "status": "successful",
                    "message": "task created successfully",
                    "data": task
                })
            } else {
                // all fields not provided
                res.status(400).json({
                    "status": "failed",
                    "message": "All fields must be provided."
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "status": "failed",
                "message": "Server Error"
            })
        }
    }

    // get a task by ID
    static getTaskByID = async (req, res) => {
        try {
            const task = await taskModel.findOne({_id: req.params.id, userID: req.user._id})
            // task does not exists
            if (!task) {
                return res.status(404).json({
                    "status": "failed",
                    "message": "Task not found."
                })
            }
            res.status(200).json({
                "status": "successful",
                "data": task
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "status": "failed",
                "message": "Server Error"
            })
        }
    }

    // update an existing task by ID
    static updateTaskByID = async (req, res) => {
        try {
            const {title, description, status} = req.body
            const task = await taskModel.findOne({_id: req.params.id, userID: req.user._id})
            if(!task){
                // task does not exists
                return res.status(404).json({
                    "status": "failed",
                    "message": "Task not found."
                })
            }
            // update task
            task.title = title || task.title
            task.description = description || task.description
            task.status = status || task.status
            await task.save()
            res.status(200).json({
                "status": "successful",
                "message": "Task Updated successfully.",
                "data": task
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "status": "failed",
                "message": "Server Error"
            })
        }
    }

    // delete a task by ID
    static deleteTaskByID = async (req, res) => {
        try {
            const task = await taskModel.findOne({_id: req.params.id, userID: req.user._id})
            if (!task) {
                return res.status(404).json({
                    "status": "failed",
                    "message": "Task not found."
                })
            }
            await task.deleteOne()
            res.status(200).json({
                "status": "successful",
                "message": "Task deleted successfully."
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "status": "failed",
                "message": "Server Error"
            })
        }
    }
}

export default TaskController